import { inject, injectable } from 'inversify';
import * as crypto from 'node:crypto';
import { SignJWT } from 'jose';
import { CreateUserDto, UserService } from '../users/index.js';
import { UserEntity } from '../users/user.entity.js';
import { AuthService, TokenPayload } from './index.js';
import { RestSchema, Config } from '../../config/index.js';
import { Component } from '../../../types/index.js';
import { Logger } from '../../../libs/logger/index.js';

@injectable()
export class DefaultuthService implements AuthService {
   constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService;
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {}

  public async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');

    const tokenPayload: TokenPayload ={
      name: user.author,
      email: user.email,
      id: user.id
    };

    this.logger.info(`Create token for ${user.email}`);

    return new SignJWT(tokenPayload)
      .setProtectedHeader({alg})
  }

  public async verify(dto: CreateUserDto): Promise<UserEntity> {

  }

}
