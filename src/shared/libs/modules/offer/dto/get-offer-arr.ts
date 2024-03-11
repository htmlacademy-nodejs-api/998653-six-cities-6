import { FlatType, CityType, InsideType} from '../../../../types/index.js';

export class GetOfferDtoArr {
  public name: string;
  public date: Date;
  public city: CityType;
  public prevImg: string;
  public photos: string[];
  public isPremium: boolean;
  public rating: number;
  public flat: FlatType;
  public inside: InsideType;
  public price : number;
  public comment: number;
}
