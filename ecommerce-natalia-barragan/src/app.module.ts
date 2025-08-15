import { Module, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { UsersController } from './users/users.controller';
import { ProductsController } from './products/products.controller';
import { AuthModule } from './Auth/Auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from 'src/config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt'
import ENV from 'src/config/environment';
@Module({
  imports: [UsersModule, ProductsModule, AuthModule, OrdersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('typeorm')!,
    }),
    CategoriesModule,
    FileUploadModule,
    JwtModule.register({
      global: true,
      secret: ENV.JWT_SECRET,
      signOptions: { expiresIn: '60m'}
    }),
  ],
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
