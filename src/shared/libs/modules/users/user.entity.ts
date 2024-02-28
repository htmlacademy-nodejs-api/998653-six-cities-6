import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { User, StatusType } from '../../../types/index.js';
import { createSHA256 } from '../users/hash.js';
import { DEFAULT_AVATAR, NameLength } from '../../../../const/const.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    required: true,
    unique: true,
    match: [
      /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      'Email is incorrect'
    ]
  })
    email!: string;

  @prop({
    required: true,
    minlength: [NameLength.Min, `Min length for name is ${NameLength.Min}`],
    maxlength: [NameLength.Max, `Max length for name is ${NameLength.Max}`],
    default: '',
  })
    author!: string;

  @prop({
    required: false,
    trim: true,
    match: [
      /\.(jpg|png)(\?.*)?$/i,
      'The avatar image must match the format .jpg or .png',
    ],
    default: DEFAULT_AVATAR,
  })
    avatar!: string;

  @prop({
    enum: StatusType,
    required: true
  })
    status: StatusType;

  @prop({ required: true, default: '' })
    password?: string;

  constructor(UserData: User) {
    super();

    this.email = UserData.email;
    this.author = UserData.author;
    this.avatar = UserData.avatar;
    this.status = UserData.status;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
console.log(UserModel);
