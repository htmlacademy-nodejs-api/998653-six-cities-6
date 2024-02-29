// этот тип соответсвует любоиу объекту с неопределенным количеством ключей
import { ParamsDictionary } from 'express-serve-static-core';

export type ParamUserId = {
  userId: string;
} | ParamsDictionary;
