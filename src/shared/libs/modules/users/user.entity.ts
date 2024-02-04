import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { User } from '../../../types/index.js';
import { createSHA256 } from '../users/hash.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ unique: true, required: true })
    email: string;

  @prop({ required: false, default: '' })
    avatarPath: string;

  @prop({ required: true })
    firstname: string;

  @prop({ required: true })
    lastname: string;

  @prop({ required: true, default: '' })
    password?: string;

  constructor(UserData: User) {
    super();

    this.email = UserData.email;
    this.avatarPath = UserData.avatarPath;
    this.firstname = UserData.firstname;
    this.lastname = UserData.lastname;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
