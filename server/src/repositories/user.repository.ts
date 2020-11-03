import {DefaultCrudRepository} from '@loopback/repository';
import {User, UserRelations} from '../models';
import {UsersDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { HttpErrors } from '@loopback/rest';

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

  async createUser(email: string, username: string): Promise<User> {
    const newUser = new User;
    newUser.email = email;
    newUser.username = username;

    try {
      const savedUser = await this.create(newUser);

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
