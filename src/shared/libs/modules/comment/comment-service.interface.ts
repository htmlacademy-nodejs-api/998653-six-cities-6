import { DocumentType } from '@typegoose/typegoose';
import { CommentEntity , CreateCommentDto} from './index.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteOfferId(offerId: string): Promise<number | null>;
}
