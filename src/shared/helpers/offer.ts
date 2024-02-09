import { TOffer, CityType, FlatType, InsideType, StatusType } from'../../shared/types/index.js';

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
    inside,
    rooms,
    adult,
    price,
    author,
    email,
    avatar,
    status,
    comment,
    latitude,
    longitude
  ] = OfferData.replace('\n', '').split('');

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
    inside: InsideType[inside as keyof typeof InsideType ],
    rooms: Number(rooms) ,
    adult:  Number(adult),
    price: Number.parseInt(price, 10),
    user: {
      author,
      email,
      avatar,
      status: StatusType[status as keyof typeof StatusType]
    },
    comment: Number(comment),
    coords: {
      latitude: Number(latitude),
      longitude: Number(longitude)
    },
  };
}


export { CreateOffer };
