import { ParamsDictionary } from 'express-serve-static-core';
import { CityType } from '../../../types/index.js';

export type ParamCityName =
  | {
    city: CityType;
  }
  | ParamsDictionary;
