import { defaultClasses, getModelForClass, prop } from '@typegoose/typegoose';
import { User } from '../../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntery extends defaultClasses.Base {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntery extends defaultClasses.TimeStamps implements User{
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
