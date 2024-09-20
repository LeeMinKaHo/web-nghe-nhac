import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:"mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "LeKhoa@123",
      database: "spotify",
      entities:[user]
    }),
    UserModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
