import 'reflect-metadata';
import { Container } from 'inversify';
import { createRestApplicationContainer, RestApplication } from './rest/index.js';
import { createUserContainer } from './shared/libs/modules/users/index.js';
import { createOfferContainer } from './shared/libs/modules/offer/index.js';
import { createCommentContainer } from './shared/libs/modules/comment/comment.container.js';
import { createAuthContainer } from './shared/libs/modules/auth/index.js';
import { Component } from './shared/types/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer(),
    createAuthContainer()
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  application.init();
}

bootstrap();


