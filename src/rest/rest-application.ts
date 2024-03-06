import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { injectable, inject } from 'inversify';
import { Component } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/database.js';
import express, { Express } from 'express';
import { Controller } from '../shared/libs/rest/controller/index.js';
import { ExceptionFilter } from '../shared/libs/rest/exception-filter/index.js';
import { ParseTokenMiddleware } from '../shared/libs/rest/middleware/index.js';
import { OfferService } from '../shared/libs/modules/offer/index.js';

@injectable()
export class RestApplication {
  private readonly server: Express;


  constructor(
  @inject(Component.Logger) private readonly logger: Logger,
  @inject(Component.Config) private readonly config: Config<RestSchema>,
  @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
  @inject(Component.OfferController) private readonly offerController: Controller,
  @inject(Component.CommentController) private readonly commentController: Controller,
  @inject(Component.UserController) private readonly userController: Controller,
  @inject(Component.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
  @inject(Component.AuthExceptionFilter) private readonly authExceptionFilter: ExceptionFilter,
  @inject(Component.OfferService) private readonly offerService: OfferService

  ) {
    this.server = express();
  }

  private async _initDb() {
    const mongoIrl = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );
    const url = this.databaseClient.connect(mongoIrl);
    return url;
  }


  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }


  public async _initControllers() {
    this.server.use('/comments/{offerId}', this.commentController.router);
    this.server.use('/offers', this.offerController.router);
    this.server.use('/users', this.userController.router);
  }

  public async _initMiddleware() {
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));
    this.server.use(express.json());
    this.server.use(
      '/upload',
      express.static(this.config.get('UPLOAD_DIRECTORY')),
    );
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
  }

  private async _initExceptionFilters() {
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`Get value from env $SALT: ${this.config.get('SALT')}`);
    this.logger.info(`Get value from env $DB_HOST: ${this.config.get('DB_HOST')}`);

    this.logger.info('Init database…');
    await this._initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init app-level middleware');
    await this._initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init controllers…');
    await this._initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init exception filters');
    await this._initExceptionFilters();
    this.logger.info('Exception filters initialization completed');

    this.logger.info('Try to init server…');
    await this._initServer();
    this.logger.info(`🚀 Server started on http://localhost:${this.config.get('PORT')}`);

    const premium = this.offerService.findPremiumByCity('Paris');
    console.log(premium);

    const favorites = this.offerService.findFavorites();
    console.log(favorites);

  }
}
