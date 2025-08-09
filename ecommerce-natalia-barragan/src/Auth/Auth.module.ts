import { Module } from '@nestjs/common';
import { AuthController } from './Auth.controller';
import { AuthService } from './Auth.service';
import { UsersRepository } from 'src/users/users.repository';
import { ProductsModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, ProductsModule],
})
export class AuthModule {}
