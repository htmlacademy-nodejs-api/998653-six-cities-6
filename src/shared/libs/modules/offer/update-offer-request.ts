import { Request } from 'express';
import { RequestBody, RequestParams } from '../../rest/types/index.js';
import { UpdateOfferDto } from './index.js';

export type UpdateOfferRequest = Request<RequestParams, RequestBody, UpdateOfferDto>;
