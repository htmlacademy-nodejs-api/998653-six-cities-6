import { TOffer, CityType, FlatType, InsideType, StatusType } from '../../shared/types/index.js';

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
    comment,
    coords,
  ] = OfferData.replace('\n', '').split('\t');
  const [latitude, longitude] = coords.split(';');
  const res = {
    name,
    desription,
    date: new Date(date),
    city: CityType[city as 'Paris' | 'Cologne' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf'],
    prevImg,
    photos: photos.split('|'),
    isPremium: !!isPremium,
    isFavorite: !!isFavorite,
    rating: Number(rating),
    flat: FlatType[flat as 'Room' | 'Apartment' | 'House' | 'Hotel'],
    inside: inside as InsideType || 'Breakfast',
    rooms: Number(rooms),
    adult: Number(adult),
    price: Number.parseInt(price, 10),
    user: {
      author,
      email,
      avatar,
      status: status as StatusType
    },
    comment: Number(comment),
    coords: {
      latitude: Number(latitude),
      longitude: Number(longitude)
    },
  };

  return res;
}


export { CreateOffer };
