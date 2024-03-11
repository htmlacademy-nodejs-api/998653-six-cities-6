import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../users/rdo/user.rdo.js';

export class OfferRdo {
  @Expose()
  public name: string;

  @Expose()
  public description: string;

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
  public user: UserRdo;

  @Expose()
  public comment: number;

  @Expose()
  public coords: number[];
}
