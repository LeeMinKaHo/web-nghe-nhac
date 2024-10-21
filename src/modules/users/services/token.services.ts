import { InjectRepository } from "@nestjs/typeorm";
import { token } from "src/database/entities/token.entity";
import { Repository } from "typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class tokenService{
    constructor(
        @InjectRepository(token)
        private tokenRepository : Repository<token>,
        private readonly jwtService: JwtService
    ){}
    async createToken(userId : number){
        var newToken = this.tokenRepository.create();
        newToken.tokenValue = await this.jwtService.signAsync({ sub :userId });
        newToken.expireAt = new Date(Date.now() + 60 * 60 * 1000); // Set expiration to 1 hour from now
        newToken.userId = userId; // Assuming forgotPasswordDTO contains the userId
        await this.tokenRepository.save(newToken);
        return newToken.tokenValue
    }
    async verifyToken(token : string){
        try{
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                  secret: process.env.JWT_CONSTANTS
                }
            )
        }
        catch{
            throw new BadRequestException();
        }
    }
}