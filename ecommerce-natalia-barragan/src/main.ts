import ENV from 'config/environment';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(ENV.PORT ?? 3000);
}
bootstrap();
