import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import {
  IUserService,
  SearchUserParams,
} from './interfaces/search-user-params';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService implements IUserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll(params: SearchUserParams) {
    return this.userModel
      .find({
        email: { $regex: new RegExp(params.email, 'i') },
        name: { $regex: new RegExp(params.name, 'i') },
        contactPhone: { $regex: new RegExp(params.contactPhone, 'i') },
      })
      .limit(+params.limit)
      .skip(+params.offset)
      .exec();
  }

  findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
