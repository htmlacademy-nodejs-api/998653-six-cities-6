import { Expose } from 'class-transformer'

export class CategoryRdo {
  //этот декоратор говорит что свойство должно быть заполнено/установлено
  @Expose()
  public id: string;
  
  @Expose()
  public name: string;
}
