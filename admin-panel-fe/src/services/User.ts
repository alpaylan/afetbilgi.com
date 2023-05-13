import { User } from '../interfaces/User';
import { mockUsers } from '../mocks/User';

export const getUsers = async (): Promise<User[]> => mockUsers;
