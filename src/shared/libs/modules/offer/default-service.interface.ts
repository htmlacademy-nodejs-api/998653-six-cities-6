import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity, OfferService } from './index.js';
import { Logger } from '../../logger/index.js';
import { Component } from '../../../types/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ){}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }

  public async getAllOffers(): Promise<DocumentType<OfferEntity>[]> {

  }

  public async updateOffer(): Promise<DocumentType<OfferEntity> | null> {

  }

  public async deleteOfferById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async getPremiumOffersByCity(): Promise<DocumentType<OfferEntity>[]> {

  }

  public async getAllFavoriteOffersByUser(userId: string): Promise<DocumentType<OfferEntity>[]> {

  }

  public async 

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }



}
