import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { user } from 'src/database/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.services';
import { tokenService } from './token.services';
@Injectable()
export class MailService {
  constructor(
    private readonly mailService: MailerService,
    private TokenService : tokenService
  ) {}

  async sendMail(User : user) {
    const resetToken = await this.TokenService.createToken(User.id);
    console.log("Token" ,resetToken)
    const message = "Hello Khoa"
    const htmlMessage = `
        <p>Hi ${User.username},<p/>
        <p>Forget your password</p>
        <p>We receive your request to reset your password account<p>

        <a href="http://localhost:3000/resetPassword?token=${resetToken}">click here to reset password<a>

        <p>If you did not forget your password, you can ignore this email.</p>
    `;

    return await this.mailService.sendMail({
      from: 'Kingsley Okure <kingsleyokgeorge@gmail.com>',
      to: User.email,
      subject: `How to Send Emails with Nodemailer`,
      text: message,
      html: htmlMessage,
    });

  }
}