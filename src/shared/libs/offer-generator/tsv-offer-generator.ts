import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { TMocksServerData} from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { OfferMap } from '../../../const/const.js';

class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: TMocksServerData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const desription = getRandomItem<string>(this.mockData.desriptions);
    const date = dayjs()
      .subtract(generateRandomValue(OfferMap.FIRST_WEEK_DAY, OfferMap.LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const prevImage = getRandomItem<string>(this.mockData.prevImages);
    const photos = getRandomItems<string>(this.mockData.photos).join(';');
    const isPremium = generateRandomValue(OfferMap.VALUE_MIN, OfferMap.VALUE_MAX).toString();
    const isFavorite = generateRandomValue(OfferMap.VALUE_MIN,OfferMap.VALUE_MAX).toString();
    const rating = generateRandomValue(OfferMap.RATING_MIN, OfferMap.RATING_MAX).toString();
    const flat = getRandomItem<string>(this.mockData.flats);
    const inside = getRandomItems<string>(this.mockData.insides).join(';');
    const rooms = generateRandomValue(OfferMap.ROOMS_MIN,OfferMap.ROOMS_MAX).toString();
    const adult = generateRandomValue(OfferMap.ADULT_MIN, OfferMap.ADULT_MAX).toString();
    const price = generateRandomValue(OfferMap.PRICE_MIN, OfferMap.PRICE_MAX).toString();
    const user = getRandomItem<string>(this.mockData.users);
    const comments = generateRandomValue(OfferMap.COMMENT_MIN,OfferMap.COMMENT_MAX).toString();
    const coords = [
      generateRandomValue(OfferMap.COORD_MIN, OfferMap.COORD_MAX).toString(),
      generateRandomValue(OfferMap.COORD_MIN, OfferMap.COORD_MAX).toString(),
    ].join(';');

    return [
      name,
      desription,
      date,
      city,
      prevImage,
      photos,
      isPremium,
      isFavorite,
      rating,
      flat,
      rooms,
      adult,
      price,
      inside,
      user,
      comments,
      coords
    ]. join('\t');
  }
}

export { TSVOfferGenerator };
