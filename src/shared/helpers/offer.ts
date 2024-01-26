import { TOffer, CityType, FlatType, TUser, StatusType, TLocation} from'../../shared/types/index.js';

function CreateOffer(OfferData: string): TOffer {
  const [
    name,
    desription,
    date,
    city,
    prevImg,
    photos,
    isPremium,
    isFavorite,
    rating,
    flat,
    rooms,
    adult,
    price,
    inside,
    author,
    email,
    avatar,
    status,
    comments,
    latitude,
    longitude
  ] = OfferData.replace('\n', '').split(',');

  const user: TUser = {
    author,
    email,
    avatar,
    status: StatusType[status as 'Standard' | 'Pro'],
  };

  const coords: TLocation = {
    latitude: Number(latitude),
    longitude: Number(longitude),
  };

  return {
    name,
    desription,
    date: new Date(date),
    city: CityType[city as 'Paris' | 'Cologne' |'Amsterdam' |'Hamburg' | 'Dusseldorf'],
    prevImg,
    photos: photos.split('|'),
    isPremium: !!isPremium,
    isFavorite: !!isFavorite,
    rating: Number(rating),
    flat: FlatType[flat as 'Room' | 'Apartment' | 'House' | 'Hotel'],
    rooms: Number(rooms) ,
    adult:  Number(adult),
    price: Number.parseInt(price, 10),
    inside: inside.split('|'),
    user,
    comments: Number(comments),
    coords
  };
}


export { CreateOffer };
