import { inject, injectable } from 'inversify';
import { Logger } from '../../logger/index.js';
import { BaseController} from '../../rest/controller/index.js';
import { HttpMethod } from '../../../libs/rest/types/index.js';
import { Component } from '../../../types/index.js';
import { Request, Response } from 'express';
import { CommentService, CreateCommentDto } from './index.js';
import { fillDTO } from '../../../helpers/common.js';
import { CommentRdo } from './index.js';
import { StatusCodes } from 'http-status-codes';
import { HttpError} from '../../../libs/rest/errors/index.js';
import { OfferService } from '../offer/index.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
  @inject(Component.Logger)protected readonly logger: Logger,
  @inject(Component.CommentService) private readonly commentService: CommentService,
  @inject(Component.OfferService) private readonly offerService: OfferService
  ){
    // передаем в конструктор BaseController
    super(logger);

    this.logger.info('Register routes for CategoryController…');
    this.addRoute({ path:'/:id', method: HttpMethod.Post, handler: this.create });
  }

  public async create(
    {body}: Request<Record<string, unknown>,Record<string, unknown>, CreateCommentDto>,
    res: Response): Promise<void> {
    if (! await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const result = await this.commentService.create(body);
    this.created(res, fillDTO(CommentRdo, result));
  }
}
