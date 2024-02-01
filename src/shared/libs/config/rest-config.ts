import { Config } from './config.interface.js';


export class RestConfig implements Config {
  private readonly config: NodeJS.ProcessEnv;

  constructor(){}
  get(key: string): string | undefined {
    return this.config[key];
  }
}
