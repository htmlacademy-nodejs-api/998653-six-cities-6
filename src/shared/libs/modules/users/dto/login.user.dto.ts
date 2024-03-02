import { IsEmail, IsString, Length } from 'class-validator';
import { LoginUserMessage } from './login-user.messages.js';

export class LoginUserDto {
  @IsEmail({}, { message: LoginUserMessage.email.invalidFormat })
  public email: string;

  @IsString({ message: LoginUserMessage.email.invalidFormat })
  public password: string;
}

