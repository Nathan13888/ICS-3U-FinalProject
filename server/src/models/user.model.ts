import {Entity, model, property} from '@loopback/repository';

enum Role {
  STUDENT='student',
  MENTOR='mentor',
  TEACHER='teacher',
}

@model({
    settings: {
    indexes: {
      uniqueEmail: {
        keys: {
          email: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  }
}
)
export class User extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(Role),
    }
  })
  role: Role;

  @property({
    type: 'string',
  })
  firstName?: string;

  @property({
    type: 'string',
  })
  lastName?: string;

  @property({
    type: 'number',
    jsonSchema: {
      type: "integer",
      minimum: 1,
      maximum: 12,
    }
  })
  grade?: number;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
