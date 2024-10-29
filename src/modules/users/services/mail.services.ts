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
   
    const message = "Hello Khoa";

    const htmlMessage = `
        <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        padding: 20px;
                    }
                    .container {
                        background-color: #ffffff;
                        border-radius: 5px;
                        padding: 20px;
                        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #333;
                    }
                    p {
                        color: #555;
                        line-height: 1.5;
                    }
                    .reset-link {
                        display: inline-block;
                        margin: 20px 0;
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                    }
                    .reset-link:hover {
                        background-color: #0056b3;
                    }
                    footer {
                        margin-top: 20px;
                        font-size: 12px;
                        color: #999;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Hi ${User.username},</h1>
                    <p>We received your request to reset your password.</p>
                    <p>Please click the button below to reset your password:</p>
                    <a class="reset-link" href="http://localhost:3000/resetPassword?token=${resetToken}">Reset Password</a>
                    <p>If you did not forget your password, you can ignore this email.</p>
                </div>
                <footer>
                    <p>Thank you,<br>Spotify</p>
                </footer>
            </body>
        </html>
    `;

    await this.mailService.sendMail({
      from: 'Kingsley Okure <kingsleyokgeorge@gmail.com>',
      to: User.email,
      subject: `How to Send Emails with Nodemailer`,
      text: message,
      html: htmlMessage,
    });
    return "Send mail successfull"

  }
}