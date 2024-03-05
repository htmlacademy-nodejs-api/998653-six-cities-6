import { UserEntity } from '../users/index.js';
import { LoginUserDto } from '../users/dto/index.js';

export interface AuthService {
  authenticate(user: UserEntity): Promise<string>
  verify(dto: LoginUserDto): Promise<UserEntity>
}
