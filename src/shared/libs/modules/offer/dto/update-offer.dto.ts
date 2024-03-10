import { FlatType, Location, CityType, InsideType} from '../../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsUrl,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested
} from 'class-validator';


export class UpdateOfferDto {
  @IsOptional()
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public name?: string;

  @IsOptional()
  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsEnum(CityType, { message: CreateOfferValidationMessage.city.invalidFormat })
  public city?: CityType;

  public prevImg?: string;

  @IsOptional()
  @IsArray({ message: CreateOfferValidationMessage.photos.invalidFormat})
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.photos.ArrayMinSize })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.photos.ArrayMaxSize })
  public photos?: string[];

  @IsOptional()
  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(FlatType, { message: CreateOfferValidationMessage.houseType.invalidFormat })
  public flat?: FlatType;

  @IsOptional()
  @IsArray({message: CreateOfferValidationMessage.houseType.invalidFormat})
  public inside?: InsideType;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.countRooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.countRooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.countRooms.maxValue })
  public rooms?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.countGuests.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.countGuests.minValue })
  @Max(10, { message: CreateOfferValidationMessage.countGuests.maxValue })
  public adult?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.rentPrice.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.rentPrice.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.rentPrice.maxValue })
  public price?: number;

  @IsOptional()
  @ValidateNested()
  public coords?: Location;
}

