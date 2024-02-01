import { Logger } from '../shared/libs/logger/index.js';

export class RestApplication {
  constructor(
    private logger: Logger
  ) {}

  public async init() {
    this.logger.info('Application initialization');
  }
}
