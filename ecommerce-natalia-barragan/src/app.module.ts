import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { UsersController } from './users/users.controller';
import { ProductsController } from './products/products.controller';
import { AuthModule } from './Auth/Auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
@Module({
  imports: [UsersModule, ProductsModule, AuthModule],
  controllers: [UsersController, ProductsController],
  providers: [],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UsersController, ProductsController);
  }
}
