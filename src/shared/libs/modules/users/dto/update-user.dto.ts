import { IsEmail, IsString, Length, IsOptional, IsEnum } from 'class-validator';
import { CreateUserMessages } from './index.js';
import { StatusType } from '../../../../types/index.js';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: CreateUserMessages.username.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.username.lengthField })
  public author?: string;

  @IsOptional()
  @IsEmail(undefined, { message: CreateUserMessages.email.invalidFormat })
  public email?: string;

  @IsOptional()
  @IsString({ message: CreateUserMessages.avatarPath.invalidFormat })
  public avatar?: string;

  @IsOptional()
  @IsEnum(StatusType, {message: CreateUserMessages.status.invalidFormat})
  public status?: StatusType;

  @IsOptional()
  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password?: string;
}
