import { UserEntity } from '../users/index.js';
import { CreateUserDto } from '../users/dto/index.js';

export interface AuthService {
  authenticate(user: UserEntity): Promise<string>
  verify(dto: CreateUserDto): Promise<UserEntity>
}
