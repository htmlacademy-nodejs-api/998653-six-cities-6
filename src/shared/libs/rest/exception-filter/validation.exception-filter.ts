import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { ExceptionFilter } from './index.js';
import { Logger } from '../../logger/index.js';
import { Component } from '../../../types/index.js';
import { ValidationError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register ValidationExceptionFilter');
  }

  public catch(err: unknown, _req: Request, res: Response, next: NextFunction): void {
    if(!(err instanceof ValidationError)) {
      return next(err);
    }
    this.logger.error(`[ValidationException]: ${err.message}`, err);
    err.details.forEach(
      (errorField) => this.logger.warn(`[${errorField.property}] — ${errorField.messages}`)
    );

    res
      .status(StatusCodes.BAD_REQUEST)
      .json
  }


}
