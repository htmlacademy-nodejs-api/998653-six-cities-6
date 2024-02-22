import { inject, injectable } from 'inversify';
import { Logger } from '../../logger/index.js';
import { BaseController} from '../../rest/controller/index.js';
import { HttpMethod } from '../../../libs/rest/types/index.js';
import { Component } from '../../../types/index.js';
import { Request, Response } from 'express';
import { CommentService } from './index.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
  @inject(Component.Logger)protected readonly logger: Logger,
  @inject(Component.CommentService) private readonly commentService: CommentService
  ){
    // передаем в конструктор BaseController
    super(logger);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({ path:'/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path:'/', method: HttpMethod.Post, handler: this.create });
  }

  //для отдачи списка корневого ресурса
  public async index(_req: Request, res: Response) {
    const comments = await this.commentService.findByOfferId(offerId);
    this.ok(res, comments);
  }

  public create(req: Request, res: Response) {}
}
