import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { currentUserMiddleware } from './modules/users/middlewares/current-user.middleware';

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
 
await app.listen(3000);

}
bootstrap();
