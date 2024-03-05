import { Container } from 'inversify';
import { Component } from '../../../types/index.js';
import { AuthService, DefaultAuthService, AuthExceptionFilter} from './index.js';
import { ExceptionFilter } from '../../rest/exception-filter/index.js';

export const createAuthContainer = () => {
  const authContainer = new Container();
  authContainer.bind<AuthService>(Component.AuthService).to(DefaultAuthService).inSingletonScope();
  authContainer.bind<ExceptionFilter>(Component.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();
}
