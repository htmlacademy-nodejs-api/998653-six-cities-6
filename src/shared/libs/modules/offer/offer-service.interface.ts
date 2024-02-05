import { CreateOfferDto, OfferEntity } from './index.js';
import { DocumentType } from '@typegoose/typegoose';

export interface OfferService {
  create(dto: CreateOfferDto, salt: string):Promise<DocumentType<OfferEntity>>
  findOrCreate(dto: CreateOfferDto, salt: string): Promise<DocumentType<OfferEntity>>;
}
