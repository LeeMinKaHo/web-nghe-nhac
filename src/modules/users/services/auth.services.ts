import { InjectRepository } from "@nestjs/typeorm";
import { user } from "src/database/entities/user.entity";
import { Or, Repository } from "typeorm";
import { SignInDTO } from "../dto/signIn.dto";
import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { SignUpDTO } from "../dto/signUp.dto";
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(user)
        private userRepository : Repository<user>
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
        const username = signInDTO.username
        const user = await this.userRepository.findOne({
            where: { username },
            select: ['email', 'password','avatarUrl'],

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
}