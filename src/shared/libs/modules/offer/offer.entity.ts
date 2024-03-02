import { Ref, defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { CityType, FlatType, InsideType, Location } from '../../../types/index.js';
import { OfferMap } from '../../../../const/const.js';
import { UserEntity } from '../users/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    require: true,
    minlength: OfferMap.NAME_MIN,
    maxlength: OfferMap.NAME_MAX
  })
  public name!: string;

  @prop({
    trim: true,
    require: true,
    minlength: OfferMap.DESCRIPTION_MIN,
    maxlength: OfferMap.DESCRIPTION_MAX
  })
  public description!: string;

  @prop({
    required: true,
  })
  public date: Date;

  @prop({
    enum: CityType,
    required: true
  })
  public city!: CityType;

  @prop({
    required: true,
    trim: true,
    match: [
      /\.(jpg|png)(\?.*)?$/i,
      'The avatar image must match the format .jpg or .png',
    ],
  })
  public prevImg!: string;

  @prop({
    type: () => [String],
    default: [],
    required: true,
  })
  public photos: string[];

  @prop({
    require: true,
    default: false,
  })
  public isPremium!: boolean;

  @prop({
    require: true,
    default: false,
  })
  public isFavorite!: boolean;

  @prop({
    require: true,
    min: OfferMap.RATING_MIN,
    max: OfferMap.RATING_MAX
  })
  public rating!: number;

  @prop({
    type: () => String,
    enum: FlatType,
    required: true
  })
  public flat!: FlatType;

  @prop({
    default: [],
    type: () => [String],
    required: true
  })
  public inside!: InsideType;

  @prop({
    required: true,
    min: OfferMap.ROOMS_MIN,
    max: OfferMap.ROOMS_MAX,
  })
  public rooms!: number;

  @prop({
    required: true,
    min: OfferMap.ADULT_MIN,
    max: OfferMap.ADULT_MAX,
  })
  public adult!: number;

  @prop({
    required: true,
    min: OfferMap.PRICE_MIN,
    max: OfferMap.PRICE_MAX,
  })
  public price!: number;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId!: Ref<UserEntity>;

  @prop({
    default: 0
  })
  public comment!: number;

  @prop({
    type: () => [Number],
    required: true
  })
  public coords!: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
