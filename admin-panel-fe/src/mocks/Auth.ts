import { TokenPayload } from '../interfaces/Auth';

export const mockUserTokenPayload: TokenPayload = {
  userID: '1',
  username: 'Eren Erişken',
  email: 'erenerisken@gmail.com',
  authorizedPipelineStages: ['TRANSLATION', 'VERIFICATION'],
  roles: [],
};

export const mockAdminTokenPayload: TokenPayload = {
  userID: '1',
  username: 'Alperen Keleş',
  email: 'keles@gmail.com',
  authorizedPipelineStages: ['DRAFT', 'READY', 'TRANSLATION', 'VERIFICATION'],
  roles: ['ADMIN'],
};
