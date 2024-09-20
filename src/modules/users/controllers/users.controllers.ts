import { Body, Controller, Post, Session } from "@nestjs/common";
import { SignInDTO } from "../dto/signIn.dto";
import { SignUpDTO } from "../dto/signUp.dto";
import { AuthService } from "../services/auth.services";
import { UsersService } from "../services/users.services";
import { UserReponse } from "../dto/usereponse.dto";


@Controller('users')
export class UsersController{
    constructor(
        private usersService : UsersService,
        private authService : AuthService
    ){}
    @Post('sign-up')
    async signUp(@Body() signUpDTO : SignUpDTO){
        return await this.authService.SignUp(signUpDTO)
    }
    @Post('sign-in')
    async signIn(
        @Body() SignInDTO : SignInDTO,
        @Session() session: Record<string, any>,
    ){
        const user = await this.authService.SignIn(SignInDTO);
        session.userId = user.id;
         // Create a response object
        const userResponse: UserReponse = {
            avatarUrl: user.avatarUrl,
            email: user.email,
        };     
        return userResponse;
    }
}