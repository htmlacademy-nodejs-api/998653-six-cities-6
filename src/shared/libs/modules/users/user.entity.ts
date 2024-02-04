import { getModelForClass, prop } from '@typegoose/typegoose';
import { User } from '../../../types/index.js';

export class UserEntery implements User {
  @prop({ unique: true, required: true })
    email: string;

  @prop({ required: false, default: '' })
    avatarPath: string;

  @prop({ required: true })
    firstname: string;

  @prop({ required: true })
    lastname: string;
}


export const UserModel = getModelForClass(UserEntery);
