import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { TMocksServerData} from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const VALUE_MIN = 0;
const VALUE_MAX = 1;

const RATING_MIN = 1;
const RATING_MAX = 5;

const ROOMS_MIN = 1;
const ROOMS_MAX = 5;

const PRICE_MIN = 100;
const PRICE_MAX = 1000;

const COMMENT_MIN = 1;
const COMMENT_MAX = 10;

const COORD_MIN = 1;
const COORD_MAX = 10;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: TMocksServerData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const desription = getRandomItem<string>(this.mockData.desriptions);
    const date = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const prevImage = getRandomItem<string>(this.mockData.prevImages);
    const photos = getRandomItems<string>(this.mockData.photos).join(';');
    const isPremium = generateRandomValue(VALUE_MIN, VALUE_MAX).toString();
    const isFavorite = generateRandomValue(VALUE_MIN, VALUE_MAX).toString();
    const rating = generateRandomValue(RATING_MIN, RATING_MAX).toString();
    const flat = getRandomItem<string>(this.mockData.flats);
    const rooms = generateRandomValue(ROOMS_MIN, ROOMS_MAX).toString();
    const adult = getRandomItem<string>(this.mockData.adults);
    const price = generateRandomValue(PRICE_MIN, PRICE_MAX).toString();
    const inside = getRandomItem<string>(this.mockData.insides);
    const user = getRandomItem<string>(this.mockData.users);
    const comments = generateRandomValue(COMMENT_MIN, COMMENT_MAX).toString();
    const coords = [
      generateRandomValue(COORD_MIN, COORD_MAX).toString(),
      generateRandomValue(COORD_MIN, COORD_MAX).toString(),
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
    ]. join('/\t');
  }
}

export { TSVOfferGenerator };
