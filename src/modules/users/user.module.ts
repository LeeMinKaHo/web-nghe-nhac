import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from 'src/database/entities/user.entity';
import { UsersService } from './services/users.services';
import { UsersController } from './controllers/users.controllers';
import { AuthService } from './services/auth.services';
import { tokenService } from './services/token.services';
import { token } from 'src/database/entities/token.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './services/mail.services';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { IsUserAlreadyExistConstraint } from './decorators/is-user-already-exits';
import { MatchPasswordConstraint } from './decorators/match-password.decorator';
import { IsEmailAlreadyExistConstraint } from './decorators/is-email-already-exits.decorator';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([user, token]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_CONSTANTS,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    UsersService,
    AuthService,
    tokenService,
    MailService,
    IsUserAlreadyExistConstraint,
    MatchPasswordConstraint,
    IsEmailAlreadyExistConstraint
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UserModule {}
