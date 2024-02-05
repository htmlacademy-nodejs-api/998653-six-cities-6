import { User, FlatType, TLocation, CityType, InsideType} from '../../../../types/index.js';

export class CreateOfferDto {
  public name: string;
  public desription: string;
  public date: Date;
  public city: CityType;
  public prevImg: string;
  public photos: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public flat: FlatType;
  public inside: InsideType;
  public rooms: number;
  public adult: number;
  public price : number;
  public user: User;
  public comment: number;
  public coords: TLocation;
}
