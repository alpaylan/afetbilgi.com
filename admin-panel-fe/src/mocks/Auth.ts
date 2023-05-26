import { TokenPayload } from '../interfaces/Auth';
import { Role } from '../interfaces/Role';

export const mockUserTokenPayload: TokenPayload = {
  userID: '1',
  username: 'Eren Erişken',
  email: 'erenerisken@gmail.com',
  authorizedPipelineStages: ['VERIFICATION'],
  roles: [Role.TRANSLATOR],
};

export const mockAdminTokenPayload: TokenPayload = {
  userID: '2',
  username: 'Alperen Keleş',
  email: 'keles@gmail.com',
  authorizedPipelineStages: ['DRAFT', 'READY', 'INSPECTION', 'VERIFICATION'],
  roles: [Role.ADMIN],
};
