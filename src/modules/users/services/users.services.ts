import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { user } from "src/database/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(user)
        private userRepository : Repository<user>
    ){}

    
}