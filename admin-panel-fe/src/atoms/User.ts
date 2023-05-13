import { atom } from 'recoil';
import { User } from '../interfaces/User';

export const users = atom({
  key: 'users',
  default: [] as User[],
});
