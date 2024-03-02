import { StatusType } from '../../../../types/index.js';
import { IsEmail, IsString, Length, IsEnum } from 'class-validator';
import { CreateUserMessages } from './index.js';

export class CreateUserDto {
  @IsString({ message: CreateUserMessages.username.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.username.lengthField })
  public author: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateUserMessages.username.invalidFormat })
  public avatar: string;

  @IsEnum(StatusType, {message: CreateUserMessages.status.invalidFormat})
  public status: StatusType;

  @IsString({ message: CreateUserMessages.username.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password: string;
}

