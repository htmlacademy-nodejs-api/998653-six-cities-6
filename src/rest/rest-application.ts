import { Config, RestShema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { injectable, inject } from 'inversify';
import { Component } from '../shared/types/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/database.js';

@injectable()
export class RestApplication {
  constructor(
  @inject(Component.Logger) private readonly logger: Logger,
  @inject(Component.Config) private readonly config: Config<RestShema>,
  @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient
  ) {}

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

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
    this.logger.info(`Get value from env $SALT: ${this.config.get('SALT')}`);
    this.logger.info(`Get value from env $DB_HOST: ${this.config.get('DB_HOST')}`);

    this.logger.info('Init database…');
    await this._initDb();
    this.logger.info('Init database completed');

  }
}
