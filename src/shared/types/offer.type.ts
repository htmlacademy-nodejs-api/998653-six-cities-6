import { User } from './user.type.js';
import { FlatType } from './flat.type.enum.js';
import { TLocation } from './location.type.js';
import { CityType } from './city.type.enum.js';

export type TOffer ={
  name: string;
  desription: string;
  date: Date;
  city: CityType;
  prevImg: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  flat: FlatType;
  inside: string[];
  rooms: number;
  adult: number;
  price : number;
  user: User;
  comment: number;
  coords: TLocation
}
