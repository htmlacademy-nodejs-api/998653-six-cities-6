import { inject, injectable } from 'inversify';
import { Logger } from '../../logger/index.js';
import { BaseController, HttpError } from '../../rest/controller/index.js';
import { Component } from '../../../types/index.js';
import { HttpMethod, RequestBody, RequestParams } from '../../rest/types/index.js';
import { CreateUserRequest } from './create-user-request.type.js';
import { Request, Response } from 'express';
import { Config, RestSchema } from '../../config/index.js';
import { CreateUserDto, UserService, LoginUserDto } from './index.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../../helpers/index.js';
import { UserRdo } from './rdo/user.rdo.js';
import { OfferRdo } from '../offer/rdo/offer.rdo.js';
import { AuthService } from '../auth/index.js';
import { LoggedUserRdo } from '../users/dto/index.js';
import { UploadUserAvatarRdo } from './rdo/upload-user-avatar.rdo.js';
import { OfferService } from '../offer/offer-service.interface.js';

import {
  ValidateDtoMiddleware,
  UploadFileMiddleware,
  ValidateObjectIdMiddleware,
  PrivateRouteMiddleware
} from '../../rest/middleware/index.js';


export type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });

    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });

    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar')
      ]
    });

    this.addRoute({
      path: '/login',
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
      middlewares: [new PrivateRouteMiddleware()]
    });

    this.addRoute({ path: '/logout', method: HttpMethod.Post, handler: this.logout });
    this.addRoute({ path: '/check_auth', method: HttpMethod.Get, handler: this.checkAuth });

    this.addRoute({
      path: '/favorite-offers',
      method: HttpMethod.Post,
      handler: this.addFavoriteOffer,
      middlewares: [new PrivateRouteMiddleware()]
    });

    this.addRoute({
      path: '/favorite-offers',
      method: HttpMethod.Delete,
      handler: this.removeFavoriteOffer,
      middlewares: [new PrivateRouteMiddleware()]
    });
  }

  public async create(
    { body }: CreateUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);
    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }
    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async uploadAvatar({ params, file }: Request, res: Response) {
    const { userId } = params;
    const uploadFile = { avatar: file?.filename };
    await this.userService.updateById(userId, uploadFile);
    this.created(res, fillDTO(UploadUserAvatarRdo, { filepath: uploadFile.avatar }));
  }

  public async login(
    { body }: LoginUserRequest,
    res: Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, user);
    this.ok(res, Object.assign(responseData, { token }));
  }

  public async logout(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented', 'UserController');
  }

  public async checkAuth(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented', 'UserController');
  }

  public async checkAuthenticate({ tokenPayload: { email } }: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }

  public async addFavoriteOffer(req: Request<RequestParams, RequestBody, { offerId: string }>, res: Response) {
    const { tokenPayload, body: { offerId } } = req;
    await this.userService.addFavoriteOfferToUser(tokenPayload.id, offerId);
    const offer = await this.offerService.findById(offerId, tokenPayload.id);
    this.ok(res, fillDTO(OfferRdo, { ...offer }));
  }

  public async removeFavoriteOffer(req: Request<RequestParams, RequestBody, { offerId: string }>, res: Response) {
    const { tokenPayload, body: { offerId } } = req;
    const user = await this.userService.removeFavoriteOfferToUser(tokenPayload.id, offerId);
    this.ok(res, fillDTO(UserRdo, user));
  }
}
