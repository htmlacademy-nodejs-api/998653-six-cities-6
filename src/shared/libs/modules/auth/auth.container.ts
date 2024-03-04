import { Container } from 'inversify';
import { AuthService } from './auth-service.interface.js';
import { Component } from '../../../types/index.js';
import { DefaultService, AuthExceptionFilter} from './index.js';
import { ExceptionFilter } from '../../rest/exception-filter/index.js';


export function createAuthContainer() {
  const authContainer = new Container();

  authContainer.bind<AuthService>(Component.AuthService).to(DefaultService).inSingletonScope();
  authContainer.bind<ExceptionFilter>(Component.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;
}

