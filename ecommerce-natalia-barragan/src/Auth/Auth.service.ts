import { Injectable } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersRepository, private readonly productsModule: ProductsModule) {}
  getAuth() {
    return 'get auth';
  }
    signIn(email: string, password: string) {
    if (!email || !password) return 'Credenciales incorrectas';
    const user = this.userRepository.getUserByEmail(email);
    //if (!user || user.password !== password) return 'Credenciales incorrectas';
    return `Usuario ${email} logueado (token)`;
  }
}
