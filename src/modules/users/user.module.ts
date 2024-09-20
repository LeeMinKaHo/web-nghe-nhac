import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { user } from "src/database/entities/user.entity";
import { UsersService } from "./services/users.services";
import { UsersController } from "./controllers/users.controllers";
import { AuthService } from "./services/auth.services";
@Module({
    imports: [TypeOrmModule.forFeature([user])],
    providers: [UsersService , AuthService],
    controllers: [UsersController],
    exports: [UsersService],
  })
export class UserModule{}