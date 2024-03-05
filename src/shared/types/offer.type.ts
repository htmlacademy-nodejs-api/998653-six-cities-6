import { User, FlatType, Location, CityType, InsideType} from './index.js';

export type Offer ={
  name: string;
  description: string;
  date: Date;
  city: CityType;
  prevImg: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  flat: FlatType;
  inside: InsideType;
  rooms: number;
  adult: number;
  price : number;
  user: User;
  comment: number;
  coords: Location
}


