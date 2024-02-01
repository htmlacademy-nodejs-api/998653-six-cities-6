import { StatusType } from './status.type.enum.js';

type TUser= {
  author: string;
  email: string;
  avatar: string;
  status: StatusType;
}

export { TUser };
