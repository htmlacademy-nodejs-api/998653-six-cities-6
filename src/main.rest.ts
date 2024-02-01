import 'reflect-metadata';
import { Container } from 'inversify';
import { Component } from './shared/types/index.js';

import { RestApplication } from './rest/index.js';
import { PinoLogger, Logger } from './shared/libs/logger/index.js';
import { RestConfig, Config , RestShema} from './shared/libs/config/index.js';

async function bootstrap() {
  const container = new Container();

  container.bind<Logger>(Component.Logger).to(PinoLogger);
  container.bind<Config<RestShema>>(Component.Config).to(RestConfig);
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication);

  const application = container.get<RestApplication>(Component.RestApplication);
  application.init();
}

bootstrap();


