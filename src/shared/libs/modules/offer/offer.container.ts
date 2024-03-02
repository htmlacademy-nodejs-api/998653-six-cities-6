import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Component } from '../../../types/component.enum.js';
import { OfferService, DefaultOfferService, OfferEntity, OfferModel } from './index.js';
import { OfferController } from './index.js';
import { Controller } from '../../rest/controller/index.js';
import { ValidateDtoMMiddleware } from '../../rest/middleware/'

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();

  return offerContainer;
}
