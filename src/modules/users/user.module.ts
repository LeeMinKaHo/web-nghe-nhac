import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { user } from "src/database/entities/user.entity";
import { UsersService } from "./services/users.services";
import { UsersController } from "./controllers/users.controllers";
import { AuthService } from "./services/auth.services";
import { tokenService } from "./services/token.services";
import { token } from "src/database/entities/token.entity";
import { MailerModule } from "@nestjs-modules/mailer";
import { MailService } from "./services/mail.services";

@Module({
    imports: [
      TypeOrmModule.forFeature([user,token])
    ],
    providers: [UsersService , AuthService, tokenService , MailService],
    controllers: [UsersController],
    exports: [UsersService],
  })
export class UserModule{}