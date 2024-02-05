import { Schema, Document, model} from 'mongoose';
import { User } from '../../../types/index.js';

export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userShema = new Schema({
  email: {
    type: String,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
  },
  avatar: {
    type: String,
    required: true,
    minlength: [5, 'Min length for avatar path is 5'],
  },
  author: {
    type: String,
    required: true,
    minlength: [2, 'Min length for firstname is 2']
  },
  status: {
    type: String,
    required: true,
    enum: StatusType,
  }
}, { timestamps: true });

export const userModel = model<UserDocument>('User', userShema);
