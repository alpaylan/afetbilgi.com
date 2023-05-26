import { DateTime } from 'luxon';
import { mockAdminTokenPayload, mockUserTokenPayload } from '../mocks/Auth';

// TODO
export const login = async (
  username: string,
  password: string,
): Promise<string> => {
  // eslint-disable-next-line no-console
  console.log('Logging in: ', username, ' ', password);

  return JSON.stringify({
    issuedAt: DateTime.now().toISO(),
    payload:
      username === 'admin' ? mockAdminTokenPayload : mockUserTokenPayload,
  });
};
