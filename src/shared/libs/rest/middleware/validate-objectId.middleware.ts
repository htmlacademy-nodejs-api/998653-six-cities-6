import { Request, Response, NextFunction } from 'express';
import { Middleware } from '../middleware/middleware.interface.js';
import { Types } from 'mongoose';
import { HttpError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

export class ValidateObjectIdMiddleware implements Middleware{
  constructor(
    //название параметра в котором передается идентификатор
    private param: string
  ) {}

  public execute({ params }: Request, _res: Response, next: NextFunction): void {
    const objectId = params[this.param];
    if(Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${objectId} is invalid ObjectId`,
      'ValidateObjectIdMiddleware'
    );
  }
}
