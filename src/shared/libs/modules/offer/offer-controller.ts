import { inject, injectable } from 'inversify';
import { BaseController } from '../../rest/controller/base-controller.abstracture.js';
import { HttpError } from '../../rest/errors/index.js';
import { Component } from '../../../types/index.js';
import { Logger } from '../../logger/index.js';
import { CreateOfferDto, CreateOfferRequest, OfferService, UpdateOfferDto, UpdateOfferRequest } from './index.js';
import { HttpMethod } from '../../rest/types/http-method.enum.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { UploadImagesRdo } from './rdo/upload-images.rdo.js';
import { CommentRdo, CommentService } from '../comment/index.js';
import { StatusCodes } from 'http-status-codes';
import { ParamCityName, ParamOfferId } from '../../rest/types/index.js';
import {
  PrivateRouteMiddleware,
  UploadFileMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware
} from '../../rest/middleware/index.js';
import { DocumentExistsMiddleware } from '../../rest/middleware/document-exists.middleware.js';
import { Config, RestSchema } from '../../config/index.js';


@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({
      path: '/',
      method: HttpMethod.Get,
      handler: this.index
    });

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
      ]
    });


    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.show });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Put,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto)
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.find,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });

    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

    this.addRoute({
      path: '/:city/premium',
      method: HttpMethod.Get,
      handler: this.getPremium,
    });

    this.addRoute({
      path: '/:offerId/prevImg',
      method: HttpMethod.Post,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'images')
      ]
    });

    this.addRoute({
      path: '/:offerId/favorite',
      method: HttpMethod.Post,
      handler: this.addToPremium,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
      ]
    });

    this.addRoute({
      path: '/bundles/favorite',
      method: HttpMethod.Get,
      handler: this.getFavorites,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });

  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body, tokenPayload }: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({ ...body, userId: tokenPayload.id });

    this.created(res, fillDTO(OfferRdo, result));
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;

    const offer = await this.offerService.findById(offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'OfferController'
      );
    }

    this.ok(res, offer);
  }

  public async update(
    { body, params }: UpdateOfferRequest,
    res: Response
  ): Promise<void> {
    const offers = this.offerService.updateById(String(params.offerId), body);
    const responseData = fillDTO(OfferRdo, offers);

    this.ok(res, responseData);
  }

  public async delete(
    { params }: Request,
    res: Response): Promise<void> {
    const existsOffer = await this.offerService.deleteById(params.offerId);

    if (!existsOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with the specified ID:«${params.offer_id}» not found.`,
        'OfferController',
      );
    }

    this.noContent(res, existsOffer);
  }

  public async find(
    { params }: Request,
    res: Response
  ) {
    const existsOffer = await this.offerService.findById(params.offerId);

    if (!existsOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with the specified ID:«${params.offer_id}» not found.`,
        'OfferController',
      );
    }
    this.ok(res, fillDTO(OfferRdo, existsOffer));
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    if (!await this.offerService.exists(params.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async addToPremium({ tokenPayload, params }: Request<ParamOfferId>, res: Response) {
    const offerId = params.offerId;
    const userId = tokenPayload.id;
    await this.offerService.addOfferToFavorites(userId, offerId);
    this.ok(res, { ok: true });
  }

  public async getPremium({ params }: Request<ParamCityName>, res: Response): Promise<void> {
    const offers = await this.offerService.findPremiumByCity(params.city);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async getFavorites({ tokenPayload }: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findFavorites(tokenPayload.id);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async uploadImage({ params, file }: Request<ParamOfferId>, res: Response) {
    const { offerId } = params;
    const updateDto = { prevImg: file?.filename };
    await this.offerService.updateById(offerId, updateDto);
    this.created(res, fillDTO(UploadImagesRdo, updateDto));
  }
}
