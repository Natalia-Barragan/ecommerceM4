import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
  
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async getAllUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const usersList = await this.userRepository.find({
      skip: skip,
      take: limit,
    });
    return usersList.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getUserById (id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if(!user) throw new BadRequestException(`No se encontro al usuario con id ${id}`);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async addUser(user: Partial<Users>) {
    const { isAdmin, ...rest } = user as any;

    const newUser = await this.userRepository.save({...rest});
    const dbUser = await this.userRepository.findOneBy({ id: newUser.id });
    if(!dbUser) throw new InternalServerErrorException('No se encontro el usuario');

    const { password, isAdmin: _admin, ...userNoPassword} = dbUser;
    return userNoPassword;

  }

  async updateUser(id: string, user: Partial<Users>) {
    await this.userRepository.update(id, user);
    const updatedUser = await this.userRepository.findOneBy({ id });
    if (!updatedUser) throw new BadRequestException(`No se encontro al usuario con id ${id}`);
    const { password, ...userNoPassword } = updatedUser;
    return userNoPassword;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new BadRequestException(`No se encontro al usuario con id ${id}`);
    await this.userRepository.delete(id);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }


  async getUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
  

}