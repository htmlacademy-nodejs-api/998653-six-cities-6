import { FlatType, TLocation, CityType, InsideType} from '../../../../types/index.js';


export class UpdateOfferDto {
  public name?: string;
  public desription?: string;
  public city?: CityType;
  public prevImg?: string;
  public photos?: string[];
  public isPremium?: boolean;
  public flat?: FlatType;
  public inside?: InsideType;
  public rooms?: number;
  public adult?: number;
  public price?: number;
  public coords: TLocation;
}

