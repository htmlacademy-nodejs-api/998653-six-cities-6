import { TUser } from './ user.type.js';
import { FlatType } from './flat.type.js';
import { InsideType } from './inside.type.js';
import { TLocation } from './location.type.js';

export type Offer ={
  name: string;
  desription: string;
  date: Date;
  city: 'Paris '| 'Cologne' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';
  prevImg: string;
  photo: string;
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


export type TMocksServerData = {
  categories: string[];
  titles: string[];
  descriptions: string[];
  offerImages: string[];
  categoryImages: string[];
  users: string[];
  emails: string[];
  avatars: string[];
  };
