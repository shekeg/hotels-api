import { User } from '../users.schema';

export interface SearchUserParams {
  limit: number;
  offset: number;
  email: string;
  name: string;
  contactPhone: string;
}

export interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findAll(params: SearchUserParams): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
