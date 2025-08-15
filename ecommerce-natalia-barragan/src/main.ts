import ENV from 'src/config/environment';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  

  const config = new DocumentBuilder()
  .setTitle('Proyecto Integrador M4-Natalia Barragan')
  .setDescription('Proyecto Integrador M4-Natalia Barragan')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(ENV.PORT ?? 3000);
}
bootstrap();
