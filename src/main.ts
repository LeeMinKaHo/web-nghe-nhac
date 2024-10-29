import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { currentUserMiddleware } from './modules/users/middlewares/current-user.middleware';
import { Container } from 'typedi';
import { useContainer, Validator } from 'class-validator';
import 'reflect-metadata';
import { UserModule } from './modules/users/user.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
    
  );
  app.useGlobalPipes(new ValidationPipe({transform:true}));
  useContainer(app.select(UserModule), { fallbackOnErrors: true });
await app.listen(3000);

}
bootstrap();
