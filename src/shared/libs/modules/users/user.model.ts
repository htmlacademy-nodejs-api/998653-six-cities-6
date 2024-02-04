import {Schema, Document, model} from 'mongoose';
import { TUser } from '../../../types/index.js';

export interface UserDocument extends TUser, Document {}

const userShema = new Schema({
  email: String,
  avatarPath: String,
  firstname: String,
  lastname: String,
});

export const userModel = model<UserDocument>('TUser', userShema);
