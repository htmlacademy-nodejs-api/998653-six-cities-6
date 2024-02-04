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
      throw new Error('MongoDB client already connected');
    }
    this.logger.info('Trying to connect to MongoDB…');

    this.mongoose = await Mongoose.connect(uri);
    this.isConnected = true;

    this.logger.info('Database connection established.');
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDataBase()) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection closed.');
  }
}
