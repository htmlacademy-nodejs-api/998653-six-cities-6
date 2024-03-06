import { config } from 'dotenv';
import { injectable, inject } from 'inversify';
import { Config } from './config.interface.js';
import { Logger } from '../logger/index.js';
import { RestSchema, configRestSchema } from './rest.schema.js';
import { Component } from '../../types/component.enum.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ){
    const parsedOut = config();

    if(parsedOut.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file found and successfully parsed!');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
