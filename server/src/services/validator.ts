import {HttpErrors} from '@loopback/rest';
import isemail from 'isemail';

export function validateEmail(email: string) {
  if (!isemail.validate(email)) {
    throw new HttpErrors.UnprocessableEntity('Invalid email');
  }
}

export function validateName(name: string) {
  if (!/^\S.*[^\s]$/.test(name)) throw new HttpErrors.UnprocessableEntity('Names must not start nor end with whitespace');
}
