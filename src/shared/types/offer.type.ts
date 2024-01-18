import { TUser } from './ user.type.js';
import { CityType } from './city.type.js';
import { FlatType } from './flat.type.js';
import { InsideType } from './inside.type.js';
import { TLocation } from './location.type.js';

export type Offer ={
  name: string;
  desription: string;
  date: Date;
  city: CityType;
  prevImg: string;
  photo: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  flat: FlatType;
  rooms: number;
  adults: number;
  price : number;
  inside: InsideType[];
  user: TUser;
  comment: number;
  coords: TLocation
}
