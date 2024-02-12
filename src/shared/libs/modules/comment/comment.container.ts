import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Component } from '../../../types/component.enum.js';
import { CommentEntity, CommentModel } from './index.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind(Component.CommentModel)
  

}



