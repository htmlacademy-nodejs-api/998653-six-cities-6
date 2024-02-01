const OfferMap = {
  VALUE_MIN: 0,
  VALUE_MAX: 1,
  RATING_MIN: 1,
  RATING_MAX: 5,
  ROOMS_MIN: 1,
  ROOMS_MAX: 5,
  PRICE_MIN: 100,
  PRICE_MAX: 1000,
  COMMENT_MIN: 1,
  COMMENT_MAX: 10,
  COORD_MIN: 1,
  COORD_MAX: 10,
  ADULT_MIN:1,
  ADULT_MAX:4,
  FIRST_WEEK_DAY: 1,
  LAST_WEEK_DAY: 7,
} as const;

console.log(OfferMap);
export { OfferMap };
