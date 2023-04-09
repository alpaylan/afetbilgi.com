import { DateTime } from 'luxon';

// TODO
export const login = async (
  username: string,
  password: string,
): Promise<string> => {
  // eslint-disable-next-line no-console
  console.log('Logging in: ', username, ' ', password);

  return DateTime.now().toISO();
};
