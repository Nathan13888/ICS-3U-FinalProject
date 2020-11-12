import {inject} from '@loopback/core';
import { Filter, repository } from '@loopback/repository';
import { post, requestBody, param, getModelSchemaRef, get, getFilterSchemaFor, put, del } from '@loopback/rest';
import { User } from '../models';
import { UserRepository } from '../repositories';

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
    return this.userRepository.createUser(user);
  }

  @put('/user/{userId}', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async updateById(
    @param.path.string('userId') userId: string,
    @requestBody({description: 'update user'}) user: User,
  ): Promise<void> {
    try {
      return await this.userRepository.updateById(userId, user);
    } catch (e) {
      return e;
    }
  }

  @del('/user/{userId}', {
    responses: {
      '200': {
        description: 'Successfully deleted',
        content: {
          'application/json': {
            schema: {
              'type': 'boolean',
            }
          }
        }
      }
    }
  })
  async delete(@param.path.string('userId') userId: string): Promise<void> {
    return this.userRepository.deleteById(userId);
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

  @get('/user/search', {
    responses: {
      '200': {
        description: 'Array of User',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, {includeRelations: true}),
            }
          },
        },
      },
    },
  })
  async search(
    @param.query.object('filter', getFilterSchemaFor(User))
    filter?: Filter<User>,
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }
}
