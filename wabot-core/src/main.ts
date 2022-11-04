import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';

import { join } from 'path';
import { SocketIoAdapter } from './adapters/socket-io.adapter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Wabot API')
    .setDescription('Wabot API Documentation')
    .setVersion('1.0')
    .addTag('whatsapp')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const corsOrigins = [
    'http://localhost:3000',
    'http://pesanku.id',
    'https://pesanku.id',
    'https://amritb.github.io',
    'http://103.226.138.233',
    'http://app-wabot.developersquad.id',
  ];
  app.useWebSocketAdapter(new SocketIoAdapter(app, corsOrigins));
  app.enableCors();

  await app.listen(3001, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
