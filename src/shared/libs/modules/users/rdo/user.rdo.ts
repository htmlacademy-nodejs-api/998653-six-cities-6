import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public author: string;

  @Expose()
  public avatar: string;

  @Expose()
  public status: string;
}
