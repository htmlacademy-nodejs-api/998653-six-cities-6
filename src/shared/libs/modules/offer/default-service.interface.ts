import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDto, UpdateOfferDto } from './dto/index.js';
import { OfferEntity, OfferService } from './index.js';
import { Logger } from '../../logger/index.js';
import { Component } from '../../../types/index.js';
import { DEFAULT_PREMIUM_OFFER_COUNT, DEFAULT_OFFER_AMOUNT} from '../../../../const/const.js';
import { CityType, SortType } from '../../../types/index.js';

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
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async findAllOffers(count: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_AMOUNT ;

    return this.offerModel
      .find({limit})
      .sort({createdAt: SortType.Down})
      .populate(['userId'])
      .exec();
  }

  public async updateOffer(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true});
  }

  public async deleteOfferById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async findPremiumOffersByCity(city: string, count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_PREMIUM_OFFER_COUNT;
    return this.offerModel
      .find({limit})
      .sort({city: CityType[city]}, {isPremium : true})
      .populate(['userId'])
      .exec();
  }

  public async findAllFavoriteOffersByUser(userId: string): Promise<DocumentType<OfferEntity>[]> {

  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc' : {
        commentCount: 1,
      }})
      .exec();
  }
}
