import {DefaultCrudRepository} from '@loopback/repository';
import {User, UserRelations} from '../models';
import {UsersDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { HttpErrors } from '@loopback/rest';
import { validateEmail, validateName } from '../services/validator';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.users') dataSource: UsersDataSource,
  ) {
    super(User, dataSource);
  }

  async createUser(user: User): Promise<User> {
    validateEmail(user.email);
    if(user.firstName) validateName(user.firstName);
    if(user.lastName) validateName(user.lastName);

    try {
      const savedUser = await this.create(user);

      return savedUser;
    } catch (error) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }
}
