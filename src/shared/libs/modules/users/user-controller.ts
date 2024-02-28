import { inject, injectable } from 'inversify';
import { Logger } from '../../logger/index.js';
import { BaseController } from '../../rest/controller/base-controller.abstracture.js';
import { Component } from '../../../types/index.js';
import { HttpMethod } from '../../rest/types/index.js';
import { CreateUserRequest } from './create-user-request.type.js';
import { Response, NextFunction } from 'express';

@injectable()
export class UserController extends BaseController{
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({path: '/register', method: HttpMethod.Post, handler: this.create});
  }

  public async create (
    _req: CreateUserRequest,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      throw new Error('[UserController] Oops');
    } catch (error) {
      return next(error);
    }
  }
}
