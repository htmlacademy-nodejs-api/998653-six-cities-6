import { Expose } from 'class-transformer';

export class CommentRdo {
  //этот декоратор говорит что свойство должно быть заполнено/установлено
  @Expose()
  public id: string;

  @Expose()
  public name: string;
}
