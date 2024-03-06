import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { TMocksServerData} from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import { OfferMap } from '../../../const/const.js';

class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: TMocksServerData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const date = dayjs()
      .subtract(generateRandomValue(OfferMap.FIRST_WEEK_DAY, OfferMap.LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const prevImage = getRandomItem<string>(this.mockData.prevImages);
    const photos = getRandomItems<string>(this.mockData.photos).join(';');
    const isPremium = getRandomItem<boolean>(this.mockData.isPremiums).toString();
    const isFavorite = getRandomItem<boolean>(this.mockData.isFavorites).toString();
    const rating = generateRandomValue(OfferMap.RATING_MIN, OfferMap.RATING_MAX).toString();
    const flat = getRandomItem<string>(this.mockData.flats);
    const inside = getRandomItems<string>(this.mockData.insides).join(';');
    const rooms = generateRandomValue(OfferMap.ROOMS_MIN,OfferMap.ROOMS_MAX).toString();
    const adult = generateRandomValue(OfferMap.ADULT_MIN, OfferMap.ADULT_MAX).toString();
    const price = generateRandomValue(OfferMap.PRICE_MIN, OfferMap.PRICE_MAX).toString();
    const comments = generateRandomValue(OfferMap.COMMENT_MIN,OfferMap.COMMENT_MAX).toString();
    const author = getRandomItem<string>(this.mockData.authors).toString();
    const email = getRandomItem<string>(this.mockData.emails).toString();
    const avatar = getRandomItem<string>(this.mockData.avatars).toString();
    const status = getRandomItem<string>(this.mockData.statuses).toString();
    const latitudes = getRandomItem(this.mockData.latitudes).toString();
    const longitudes = getRandomItem(this.mockData.longitudes).toString();


    return [
      name,
      description,
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
      author,
      email,
      avatar,
      status,
      comments,
      latitudes,
      longitudes
    ]. join('\t');
  }
}

export { TSVOfferGenerator };
