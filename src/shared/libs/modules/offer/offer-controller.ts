import { inject, injectable } from 'inversify';
import { BaseController } from '../../rest/controller/base-controller.abstracture.js';
import { HttpError } from '../../rest/errors/index.js';
import { Component } from '../../../types/index.js';
import { Logger } from '../../logger/index.js';
import { OfferService, CreateOfferRequest} from './index.js';
import { HttpMethod } from '../../rest/types/http-method.enum.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { StatusCodes } from 'http-status-codes';


@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ){
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({path:'/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path:'/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({path:'/', method: HttpMethod.Put, handler: this.update});
    this.addRoute({path:'/', method: HttpMethod.Delete, handler: this.delete});
    // this.addRoute({path:'/', method: HttpMethod, handler:});
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.getAllOffers();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body } : CreateOfferRequest,
    res: Response
  ): Promise<void>{
    const result = this.offerService.create(body);

    this.created(res, fillDTO(OfferRdo, result));
  }

  public async update(
    { body, params } = 
  ): Promise<void> {

  }

  public async delete (
    { params }: Request,
    res: Response): Promise<void> {
    const existsOffer = await this.offerService.deleteOfferById(params.offer_id);

    if (!existsOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with the specified ID:«${params.offer_id}» not found.`,
        'OfferController',
      );
    }

    this.noContent(res, existsOffer);
  }

}
