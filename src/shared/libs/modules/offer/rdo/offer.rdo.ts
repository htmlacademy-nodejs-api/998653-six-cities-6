import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../users/rdo/user.rdo.js';

export class OfferRdo {
  @Expose()
  public name: string;

  @Expose()
  public desription: string;

  @Expose()
  public date: string;

  @Expose()
  public city: string;

  @Expose()
  public prevImg: string;

  @Expose()
  public photos: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public flat: string;

  @Expose()
  public inside: string;

  @Expose()
  public rooms: number;

  @Expose()
  public adult: number;

  @Expose()
  public price : number;

  @Expose({name: 'userId'})
  @Type(() => UserRdo)
  public userId: UserRdo;

  @Expose()
  public comment: number;

  @Expose()
  public coords: number[];
}
