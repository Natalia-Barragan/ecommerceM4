import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/Auth/guards/auth.guards';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()  
  @UseGuards(AuthGuard)
  getUsers(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) return this.usersService.getUsers(Number(page), Number(limit));
    return this.usersService.getUsers(1, 5);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUser(@Param('id') id: string){
    return this.usersService.getUserById(id);
  }

  @HttpCode(201)
  @Post()
  addUser(@Body() user: any){
    return this.usersService.addUser(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() user: any){
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param('id') id: string){
    return this.usersService.deleteUser(id);
  }
}
