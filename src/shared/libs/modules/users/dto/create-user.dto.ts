import { StatusType } from '../../../../types/index.js';

export class CreateUserDto {
  public author: string;
  public email: string;
  public avatar: string;
  public status: StatusType;
  public password: string;
}

