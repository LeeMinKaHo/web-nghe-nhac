import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from '../services/users.services';

@Injectable()
export class currentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: any, res: any, next: (error?: Error | any) => void) {
    const { userId } = req.session;

    if (userId) {
      const currentUser = await this.usersService.findOne(userId);
      req.currentUser = currentUser;
    }

    next();
  }
}