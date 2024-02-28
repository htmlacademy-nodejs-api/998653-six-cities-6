import { Expose, Type } from 'class-transformer';
import { User, TLocation } from '../../../../types/index.js';

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

  @Expose()
  @Type(() => UserRdo)
  public userId: User;

  @Expose()
  public comment: number;

  @Expose()
  public coords: number[];
}
