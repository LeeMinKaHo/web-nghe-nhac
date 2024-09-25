import { InjectRepository } from "@nestjs/typeorm";
import { token } from "src/database/entities/token.entity";
import { Repository } from "typeorm";
import { forgotPasswordDTO } from "../dto/forGotPassword.dto";
import { Injectable } from "@nestjs/common";
@Injectable()
export class tokenService{
    constructor(
        @InjectRepository(token)
        private tokenRepository : Repository<token>
    ){}
    async createToken(forgotPasswordDTO : forgotPasswordDTO){
        var newToken = this.tokenRepository.create();
        newToken.tokenValue = crypto.randomUUID();
        newToken.expireAt = new Date(Date.now() + 60 * 60 * 1000); // Set expiration to 1 hour from now
        newToken.userID = forgotPasswordDTO.userId; // Assuming forgotPasswordDTO contains the userId
        return await this.tokenRepository.save(newToken);
        
    }
}