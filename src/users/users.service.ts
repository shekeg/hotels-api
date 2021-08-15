import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {
  IUserService,
  SearchUserParams,
} from './interfaces/search-user-params';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService implements IUserService {
  create(createUserDto: CreateUserDto) {
    return Promise.resolve(new User());
  }

  findAll(params: SearchUserParams) {
    return Promise.resolve([new User()]);
  }

  findById(id: string) {
    return Promise.resolve(new User());
  }

  findByEmail(email: string) {
    return Promise.resolve(new User());
  }
}
