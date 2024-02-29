import { Response, Router } from 'express';
import { injectable } from 'inversify';
import { Logger } from '../../logger/logger.interface.js';
import { Controller } from './controller.interface.js';
import { Route } from '../types/route-interface.js';
import { StatusCodes } from 'http-status-codes';
// добавляет try/catch перед вызовом обработчика
import asyncHandler from 'express-async-handler';

const DEFAULT_CONTENT_TYPE = 'application/json';

@injectable()
export abstract class BaseController implements Controller {
  private readonly _router: Router;

  constructor(
    protected readonly logger: Logger,
  ) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  //рега маршрута
  public addRoute(route: Route): void {
    //обработчик маршрута из нашего контроллера
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));

    const middlewareHandlers = route.middlewares?.map(
      (middleware) => asyncHandler(middleware.execute.bind(middleware)));
    const allHandlers = middlewareHandlers ? [...middlewareHandlers, wrapperAsyncHandler] : wrapperAsyncHandler;

    this._router[route.method](route.path, allHandlers);
    this.logger.info(`Route registered: ${route.method.toUpperCase()} ${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    // res = объект ответа
    res
      .type(DEFAULT_CONTENT_TYPE)
      .status(statusCode)
      .json(data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }


}
