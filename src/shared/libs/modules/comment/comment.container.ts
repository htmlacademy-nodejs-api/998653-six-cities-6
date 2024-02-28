import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Component } from '../../../types/component.enum.js';
import { CommentEntity, CommentModel, CommentService, DefaultCommentService} from './index.js';
import { CommentController } from '../comment/index.js';
import { Controller } from '../../../libs/rest/controller/index.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
  commentContainer.bind<CommentService>(Component.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();
  commentContainer.bind<Controller>(Component.CommentController).to(CommentController).inSingletonScope();

  return commentContainer;
}


