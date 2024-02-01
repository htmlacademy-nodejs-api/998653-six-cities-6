import { Config, RestShema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';

export class RestApplication {
  constructor(
    private logger: Logger,
    private config: Config<RestShema>
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
