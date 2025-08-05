import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { AuthGuard } from 'src/Auth/guards/auth.guards';

@Module({
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, AuthGuard],
})
export class UsersModule  {}
