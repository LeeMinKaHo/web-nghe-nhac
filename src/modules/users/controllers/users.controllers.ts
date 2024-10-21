import { Body, Controller, Param, ParseIntPipe, Post, Session } from "@nestjs/common";
import { SignInDTO } from "../dto/signIn.dto";
import { SignUpDTO } from "../dto/signUp.dto";
import { AuthService } from "../services/auth.services";
import { UsersService } from "../services/users.services";

import { tokenService } from "../services/token.services";
import { MailService } from "../services/mail.services";
import { resetPasswordDto } from "../dto/resetPassword.dto";


@Controller('users')
export class UsersController{
    constructor(
        private usersService : UsersService,
        private authService : AuthService,
        private tokenService : tokenService,
        private mailService : MailService
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
        console.log(session.userId)
        return "Login susscessful";
    }
    @Post('forgot-password/:id')
    async forgotPassword(@Param('id', ParseIntPipe) id: number )
    {
        return  await this.authService.forgotPassword(id)
    }
    @Post('reset-password')
    async resetPassword(@Body() ResetPasswordDto : resetPasswordDto){
        await this.tokenService.verifyToken(ResetPasswordDto.tokenValue);
        console.log(true)
        return this.authService.ResetPassword(ResetPasswordDto.id,ResetPasswordDto.newPassword)
    }
}