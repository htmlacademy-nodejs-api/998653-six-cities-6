import 'reflect-metadata';
import { Container } from 'inversify';
import { createRestApplicationContainer, RestApplication } from './rest/index.js';
import { createUserContainer } from './shared/libs/modules/users/user.container.js';
import { Component } from './shared/types/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer()
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  application.init();
}

bootstrap();


