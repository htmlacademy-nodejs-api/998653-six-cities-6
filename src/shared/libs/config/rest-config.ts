import { DotenvParseOutput, config } from 'dotenv';
import { Config } from './config.interface.js';
import { Logger } from '../logger/index.js';


export class RestConfig implements Config {
  private readonly config: NodeJS.ProcessEnv;

  constructor(
    private readonly logger: Logger
  ){
    const parsedOut = config();

    if(parsedOut.error) {
      throw new Error('Can\'t read .env file. Perhaps the file does not exists.');
    }

    this.config = <DotenvParseOutput>parsedOut.parsed;
    this.logger.info('.env file found and successfully parsed!');
  }

  public get(key: string): string | undefined {
    return this.config[key];
  }
}
