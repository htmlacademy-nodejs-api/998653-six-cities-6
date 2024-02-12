import { User, FlatType, TLocation, CityType, InsideType} from './index.js';

export type TOffer ={
  name: string; //
  desription: string;
  date: Date; //
  city: CityType; //
  prevImg: string; //
  photos: string[];
  isPremium: boolean; //
  isFavorite: boolean; //
  rating: number; //
  flat: FlatType; //
  inside: InsideType;
  rooms: number;
  adult: number;
  price : number; //
  user: User;
  comment: number; //
  coords: TLocation
}

export type TOfferByList = Omit<TOffer, 'desription' | 'photos' | 'rooms' | 'adult' | 'comment' >
