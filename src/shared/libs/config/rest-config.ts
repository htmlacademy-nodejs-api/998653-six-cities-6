import { config } from 'dotenv';
import { injectable, inject } from 'inversify';
import { Config } from './config.interface.js';
import { Logger } from '../logger/index.js';
import { RestShema, configRestShema } from './rest.shema.js';
import { Component } from '../../types/component.enum.js';

@injectable()
export class RestConfig implements Config<RestShema> {
  private readonly config: RestShema;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ){
    const parsedOut = config();

    if(parsedOut.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configRestShema.load({});
    configRestShema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestShema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof RestShema>(key: T): RestShema[T] {
    return this.config[key];
  }
}
