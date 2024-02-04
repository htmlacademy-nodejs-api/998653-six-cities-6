import 'reflect-metadata';
import { Container } from 'inversify';
import { Component } from './shared/types/index.js';
import { DatabaseClient, MongoDatabaseClient } from './shared/libs/database-client/index.js';

import { RestApplication } from './rest/index.js';
import { PinoLogger, Logger } from './shared/libs/logger/index.js';
import { RestConfig, Config , RestShema} from './shared/libs/config/index.js';

async function bootstrap() {
  const container = new Container();

  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestShema>>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inRequestScope();

  const application = container.get<RestApplication>(Component.RestApplication);
  application.init();
}

bootstrap();


