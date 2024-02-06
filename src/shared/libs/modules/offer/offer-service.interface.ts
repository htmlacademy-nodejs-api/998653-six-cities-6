import { CreateOfferDto, OfferEntity } from './index.js';
import { DocumentType } from '@typegoose/typegoose';

export interface OfferService {
  create(dto: CreateOfferDto):Promise<DocumentType<OfferEntity>>
  findOrCreate(offerId: string): Promise<DocumentType<OfferEntity>> | null;
}
