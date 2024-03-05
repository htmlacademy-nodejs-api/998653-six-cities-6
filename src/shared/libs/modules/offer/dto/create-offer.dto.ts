import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsUrl,
  IsObject,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import { FlatType, CityType, InsideType, Location} from '../../../../types/index.js';
import { CreateOfferValidationMessage } from './index.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public name: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.publicationDate.invalidFormat })
  public date: Date;

  @IsEnum(CityType, { message: CreateOfferValidationMessage.city.invalidFormat })
  public city: CityType;

  @IsUrl({}, { message: CreateOfferValidationMessage.imagePreview.isUrl })
  @Matches(/\.(jpg|png)(\?.*)?$/i, { message: CreateOfferValidationMessage.imagePreview.matches })
  public prevImg: string;

  @IsArray({ message: CreateOfferValidationMessage.photos.invalidFormat})
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.photos.ArrayMinSize })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.photos.ArrayMaxSize })
  public photos: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsBoolean({ message: CreateOfferValidationMessage.isFavorite.invalidFormat})
  public isFavorite: boolean;

  @IsInt({ message: CreateOfferValidationMessage.rating.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.rating.minValue})
  @Max(5, { message: CreateOfferValidationMessage.rating.maxValue})
  public rating: number;

  @IsEnum(FlatType, { message: CreateOfferValidationMessage.houseType.invalidFormat })
  public flat: FlatType;

  @IsEnum(InsideType, { message: CreateOfferValidationMessage.amenities.invalidFormat })
  public inside: InsideType;

  @IsInt({ message: CreateOfferValidationMessage.countRooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.countRooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.countRooms.maxValue })
  public rooms: number;

  @IsInt({ message: CreateOfferValidationMessage.countGuests.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.countGuests.minValue })
  @Max(10, { message: CreateOfferValidationMessage.countGuests.maxValue })
  public adult: number;

  @IsInt({ message: CreateOfferValidationMessage.rentPrice.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.rentPrice.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.rentPrice.maxValue })
  public price : number;

  @IsInt({ message: CreateOfferValidationMessage.commentCount.invalidFormat})
  public comment: number;

  @IsObject()
  public coords: Location;
}
