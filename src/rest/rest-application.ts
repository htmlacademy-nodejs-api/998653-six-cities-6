import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { injectable, inject } from 'inversify';
import { Component } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/database.js';
import express, { Express } from 'express';
import { Controller } from '../shared/libs/rest/controller/index.js';
import { ExceptionFilter } from '../shared/libs/rest/exception-filter/index.js';
import { OfferService } from '../shared/libs/modules/offer/index.js';

@injectable()
export class RestApplication {
  private readonly server: Express;


  constructor(
  @inject(Component.Logger) private readonly logger: Logger,
  @inject(Component.Config) private readonly config: Config<RestSchema>,
  @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
  @inject(Component.OfferService) private readonly offerService: OfferService,
  @inject(Component.OfferController) private readonly offerController: Controller,
  @inject(Component.CommentController) private readonly commentController: Controller,
  @inject(Component.UserController) private readonly userController: Controller,
  @inject(Component.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter

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
    // регаем контроллеры, чтобы роутер из этого конроллера был доступен для пользования
    this.server.use('/comments/{offerId}', this.commentController.router);
    this.server.use('/offers', this.offerController.router);
    this.server.use('/users', this.userController.router);
  }

  //все middleware -  код который будет выполяться до того, как будет выполнен определенный обработчик
  public async _initMiddleware() {
    //в  express встроенный mw express.json -для парсинга во входящих запросах
    //  конвертация тела запроса из json  в обычный объект
    this.server.use(express.json());
  }

  private async _initExceptionFilters() {
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

    const offer = await this.offerService.findById('65cbd3f22bafc2e35c2fe2e7');
    console.log(offer);

    const offers = await this.offerService.find();
    console.dir(offers, { depth: 3});

  }
}
