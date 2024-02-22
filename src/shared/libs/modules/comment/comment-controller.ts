import { inject, injectable } from 'inversify';
import { Logger } from '../../logger/index.js';
import { BaseController} from '../../rest/controller/index.js';
import { HttpMethod } from '../../../libs/rest/types/index.js';
import { Component } from '../../../types/index.js';
import { Request, Response } from 'express';

@injectable()
export class CommentController extends BaseController {
  constructor(
  @inject(Component.Logger)protected readonly logger: Logger,
  ){
    // передаем в конструктор BaseController
    super(logger);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({ path:'/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path:'/', method: HttpMethod.Post, handler: this.create });
  }

  //для отдачи списка корневого ресурса
  public index(req: Request, res: Response) {}

  public create(req: Request, res: Response) {}
}
