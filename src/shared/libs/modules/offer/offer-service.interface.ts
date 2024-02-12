import { CreateOfferDto, OfferEntity } from './index.js';
import { DocumentType } from '@typegoose/typegoose';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  getAllOffers(): Promise<DocumentType<OfferEntity>[]>
  updateOffer(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteOfferById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  getPremiumOffersByCity(city: string, limit?: number): Promise<DocumentType<OfferEntity>[]>;
  getAllFavoriteOffersByUser(userId: string): Promise<DocumentType<OfferEntity>[]>;
  exists(documentId: string): Promise<boolean>;
}
