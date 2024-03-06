import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;
}
