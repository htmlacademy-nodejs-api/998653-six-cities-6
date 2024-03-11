import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDto, UpdateOfferDto } from './dto/index.js';
import { OfferEntity, OfferService } from './index.js';
import { Logger } from '../../logger/index.js';
import { Component } from '../../../types/index.js';
import { DEFAULT_PREMIUM_OFFER_COUNT, DEFAULT_OFFER_AMOUNT } from '../../../../const/const.js';
import { SortType } from '../../../types/index.js';
import { UserEntity } from '../users/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.name}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();

    return result;
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_AMOUNT;
    return this.offerModel.aggregate([
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'offerId',
          as: 'comments',
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $addFields: {
          commentCount: { $size: '$comments' },
          totalRating: { $avg: '$comments.rating' },
        }
      },
      { $unset: ['comments'] },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true
        }
      },
      { $sort: { createdAt: SortType.Down } },
      { $limit: limit },
    ])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(['userId'])
      .exec();
  }

  public async findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]> {
    const limit = DEFAULT_PREMIUM_OFFER_COUNT;
    return this.offerModel
      .find({ city, isPremium: true }, {}, { limit })
      .sort({ date: SortType.Down })
      .populate(['userId'])
      .exec();
  }

  public async findFavorites(userId: string): Promise<DocumentType<OfferEntity>[] | null> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      return null;
    }
    return this.offerModel
      .find({
        _id: {
          $in: user.favoriteOffers
        }
      })
      .sort({ createdAt: SortType.Down })
      .populate(['userId'])
      .exec();
  }

  public async addOfferToFavorites(userId: string, offerId: string) {
    const user = await this.userModel.findOne(
      { _id: userId },
    ).exec();
    if (!user) {
      return;
    }
    const offers = user.favoriteOffers;
    const idx = offers.findIndex((el) => el._id.toString() === offerId);
    if (idx !== -1) {
      return;
    }
    const offer = await this.offerModel.findById(offerId);
    if (!offer) {
      return;
    }
    offers.push(offer);
    user.favoriteOffers = offers;
    await user.save();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          commentCount: 1,
        }
      }).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (this.offerModel
      .exists({ _id: documentId })) !== null;
  }

}

