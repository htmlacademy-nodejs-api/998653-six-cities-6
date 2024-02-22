import { Config, RestShema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { injectable, inject } from 'inversify';
import { Component } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/database.js';
import express, { Express } from 'express';
import { Controller } from '../shared/libs/rest/controller/index.js';

@injectable()
export class RestApplication {
  private readonly server: Express;


  constructor(
  @inject(Component.Logger) private readonly logger: Logger,
  @inject(Component.Config) private readonly config: Config<RestShema>,
  @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
  @inject(Component.CommentController) private readonly commentController: Controller,
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

    return this.databaseClient.connect(mongoIrl);
  }

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  public async _initControllers() {
    // путь беру из спеки?
    this.server.use('/comments/{offerId}', this.commentController.router);
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`Get value from env $SALT: ${this.config.get('SALT')}`);
    this.logger.info(`Get value from env $DB_HOST: ${this.config.get('DB_HOST')}`);

    this.logger.info('Init database…');
    await this._initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init controllers…');
    await this._initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Try to init server…');
    await this._initServer();
    this.logger.info(`🚀 Server started on http://localhost:${this.config.get('PORT')}`);
  }
}
