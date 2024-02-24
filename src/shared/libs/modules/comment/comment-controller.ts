import { inject, injectable } from 'inversify';
import { Logger } from '../../logger/index.js';
import { BaseController} from '../../rest/controller/index.js';
import { HttpMethod } from '../../../libs/rest/types/index.js';
import { Component } from '../../../types/index.js';
import { Request, Response } from 'express';
import { CommentService } from './index.js';
import { fillDTO } from '../../../helpers/common.js';
import { CategoryRdo } from './index.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
  @inject(Component.Logger)protected readonly logger: Logger,
  @inject(Component.CommentService) private readonly commentService: CommentService
  ){
    // передаем в конструктор BaseController
    super(logger);

    this.logger.info('Register routes for CategoryController…');
    this.addRoute({ path:'/:id', method: HttpMethod.Post, handler: this.create });
  }

  public create(_req: Request, _res: Response) {
    
  }
}
