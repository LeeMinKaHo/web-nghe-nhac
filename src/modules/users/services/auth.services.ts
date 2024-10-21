import { InjectRepository } from "@nestjs/typeorm";
import { user } from "src/database/entities/user.entity";
import { Or, Repository } from "typeorm";
import { SignInDTO } from "../dto/signIn.dto";
import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { SignUpDTO } from "../dto/signUp.dto";
import { plainToInstance } from 'class-transformer';

import { MailService } from "./mail.services";


@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(user)
        private userRepository : Repository<user>,
        private mailService: MailService
    ){}

    async SignUp(signUpDTO : SignUpDTO){
        const username = signUpDTO.username
        const isExist = await this.userRepository.existsBy({
            email: signUpDTO.email,
            username : signUpDTO.username
          });
        if (isExist)
            throw new BadRequestException("User already exits")
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(signUpDTO.password, salt);
  
        const newUser = await this.userRepository.save({
          ...signUpDTO,
          password,
        });
  
        return plainToInstance(user, newUser);
    }
    async SignIn(signInDTO : SignInDTO){
        const username = signInDTO.email
        const user = await this.userRepository.findOne({
            where: { email : username },
            select: [ "id",'email', 'password','avatarUrl'],

          });
        if (!user)
            throw new BadRequestException("Invalid email or password")
        const hashedPassword = user.password;
        const password = signInDTO.password;
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (isMatch) {
            return user;
         } else {
            throw new BadRequestException('Invalid email or password');
        }

    }
    async forgotPassword(userId : number){
        const user = await this.userRepository.findOne({
            where :{id : userId},
            select: ["username", "email", "id"],
        })
        return await this.mailService.sendMail(user)
    }
    async ResetPassword(userId : number , newPassword : string)
    {
        try {
            // Find the user by their ID (assuming there's a user service or repository)
            const user = await this.userRepository.findOneBy({
                id : userId
            });
    
            if (!user) {
                throw new Error('User not found');
            }
    
            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
    
            // Update the user's password (assuming there's a method to update the user)
            await this.userRepository.update(userId, {
                password: hashedPassword,  // Only update the password field
            });
            return true;  // Return true if the operation was successful
        } catch (error) {
            console.error('Error resetting password:', error);
            return false;  // Return false if there was an error
        }
    }
}