import { DatabaseClient} from './database-client.interface.js';
import * as Mongoose from 'mongoose';
import { inject } from 'inversify';
import { Logger } from '../logger/index.js';
import { Component } from '../../types/index.js';

export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;

  constructor(
    @inject(Component.Logger) private logger: Logger,
  ) {
    this.isConnected = false;
  }

  public isConnectedToDataBase() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDataBase()) {
      throw new Error('Method not implemented.');
    }

  }

  disconnect(): Promise<void> {
    throw new Error('Method not implemented.');
  }


}
