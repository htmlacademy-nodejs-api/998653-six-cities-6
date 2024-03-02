import {IsEmail, IsString, Length} from 'class-validator';
import {LoginUserMessage} from './login-user.messages.js';

export class LoginUserDto {
  
  public email: string;
  public password: string;
}
