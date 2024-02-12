import { CreateOfferDto, UpdateOfferDto } from './dto/index.js';
import { OfferEntity } from './index.js';
import { DocumentType } from '@typegoose/typegoose';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findAllOffers(count: number): Promise<DocumentType<OfferEntity>[]>
  updateOffer(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteOfferById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremiumOffersByCity(city: string, count?: number): Promise<DocumentType<OfferEntity>[]>;
  findAllFavoriteOffersByUser(userId: string): Promise<DocumentType<OfferEntity>[]>;
  exists(documentId: string): Promise<boolean>;
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>
}
