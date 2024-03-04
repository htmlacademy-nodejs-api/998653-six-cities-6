import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { ExceptionFilter } from '../../rest/exception-filter/index.js';
import { BaseUserException } from './errors/index.js';
import { Logger } from '../../logger/index.js';
import { Component } from '../../../types/component.enum.js';

@injectable()
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register AuthExceptionFilter');
  }

  catch(err: unknown, _req: Request, res: Response, next: NextFunction): void {
    if(!(err instanceof BaseUserException)) {
      return next(err);
    }

    this.logger.error(`[AuthModule] ${err.message}`, err);
    res.status(err.httpStatusCode)
      .json({
        type: 'AUTHORIZATION',
        error: err.message,
      });
  }
}
