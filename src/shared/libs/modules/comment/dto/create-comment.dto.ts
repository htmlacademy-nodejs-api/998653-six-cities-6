import {CreateCommentMessages} from './create-comment.messages.js';
import {IsInt, IsMongoId, IsString, Length, Max, Min} from 'class-validator';

export class CreateCommentDto {
  @IsString({message: CreateCommentMessages.text.invalidFormat})
  @Length(5, 1024, {message: CreateCommentMessages.text.lengthField})
  public description: string;

  @IsInt({message: CreateCommentMessages.rating.invalidFormat})
  @Min(1, {message: CreateCommentMessages.rating.minValue})
  @Max(5, {message: CreateCommentMessages.rating.maxValue})
  public rating: number;

  public userId: string;

  @IsMongoId({message: CreateCommentMessages.offerId.invalidFormat})
  public offerId: string;

}
