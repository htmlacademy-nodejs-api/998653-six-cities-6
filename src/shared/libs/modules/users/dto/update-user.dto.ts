import { IsEmail, IsString, Length } from 'class-validator';
import { CreateUserMessages } from './index.js';
export class UpdateUserDto {
  @IsString({ message: CreateUserMessages.username.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.username.lengthField })
  public author?: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email?: string;

  @IsString({ message: CreateUserMessages.avatarPath.invalidFormat })
  public avatar?: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password?: string;
}
