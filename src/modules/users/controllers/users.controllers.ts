import {
  Body,
  Controller,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
  Session,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SignInDTO } from '../dto/signIn.dto';
import { SignUpDTO } from '../dto/signUp.dto';
import { AuthService } from '../services/auth.services';
import { UsersService } from '../services/users.services';

import { tokenService } from '../services/token.services';
import { MailService } from '../services/mail.services';
import { resetPasswordDto } from '../dto/resetPassword.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { user } from 'src/database/entities/user.entity';
import { forgotPasswordDTO } from '../dto/forgotPassword.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Roles } from '../decorators/roles.decoration';
import { RolesGuard } from 'src/guards/roles.guards';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private tokenService: tokenService,
    private mailService: MailService,
  ) {}

  @Post('sign-up')
  async signUp(@Body() signUpDTO: SignUpDTO) {
    return await this.authService.SignUp(signUpDTO);
  }

  @Post('sign-in')
  async signIn(
    @Body() SignInDTO: SignInDTO,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.SignIn(SignInDTO);
    session.userId = user.id;
    return 'Login susscessful';
  }
 
  @Post('sign-out')
  async signOut(@Session() session: Record<string, any>){
    delete session.userId
    return "Sign out susscessful"
  }
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPassword : forgotPasswordDTO ) {
    return await this.authService.forgotPassword(forgotPassword.userId)
  }

  @Post('reset-password')
  async resetPassword(@Body() ResetPasswordDto: resetPasswordDto) {
    await this.tokenService.verifyToken(ResetPasswordDto.tokenValue);
   
    return this.authService.ResetPassword(
      ResetPasswordDto.id,
      ResetPasswordDto.newPassword,
    );
  }

  @UseGuards(RolesGuard)
  @Roles(['USER'])
  @UseInterceptors(FileInterceptor('file'))
  @Patch("update-avatar")
  async updateAvartar(
    @CurrentUser() currentUser : user
    ,@UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^image\/(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 10_000_000,
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return await this.usersService.updateAvatar(currentUser.id, file);
  }

  @UseGuards(RolesGuard)
  @Roles(['ADMIN'])
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @CurrentUser() currentUser: user,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^image\/(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 10_000_000,
        })
        .build(),
    )
    files: Express.Multer.File,
  ) {
    return await this.usersService.updateAvatar(currentUser.id, files);
  }
}
