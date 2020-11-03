import {inject} from '@loopback/core';
import { repository } from '@loopback/repository';
import { post, requestBody, param, getModelSchemaRef, get } from '@loopback/rest';
import { User } from '../models';
import { UserRepository } from '../repositories';
import { validateEmail, validateUsername } from '../services/validator';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @post('/user', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User)
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User),
        },
      },
    })
    user: User,
  ): Promise<User> {
    validateEmail(user.email);
    validateUsername(user.username);
    return this.userRepository.createUser(
      user.email,
      user.username,
    );
  }

  @get('/user/{userId}', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            }
          },
        },
      },
    },
  })
  async findById(@param.path.string('userId') userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }
}
