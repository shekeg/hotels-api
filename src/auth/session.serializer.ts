import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: CallableFunction) {
    done(null, user._doc._id);
  }

  async deserializeUser(payload: any, done: CallableFunction) {
    const user = await this.usersService.findById(payload);
    done(null, user);
  }
}
