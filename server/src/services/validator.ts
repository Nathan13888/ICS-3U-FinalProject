import {HttpErrors} from '@loopback/rest';
import isemail from 'isemail';

export function validateEmail(email: string) {
  if (!isemail.validate(email)) {
    throw new HttpErrors.UnprocessableEntity('Invalid email');
  }
}

export function validateUsername(username: string) {
  if (username.length < 3) throw new HttpErrors.UnprocessableEntity('Username must be minimum 3 characters');
  if (username.length > 20) throw new HttpErrors.UnprocessableEntity('Username must be maximum 20 characters');
  if (!/^[a-zA-z0-9]+$/.test(username)) throw new HttpErrors.UnprocessableEntity('Username must be alphanumeric');
}
