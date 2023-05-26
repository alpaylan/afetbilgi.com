import { DateTime } from 'luxon';
import { TokenPayload } from '../interfaces/Auth';

// TODO
export const isValidToken = (authToken: string | null): boolean => {
  if (!authToken) {
    return false;
  }

  try {
    const tokenObject = JSON.parse(authToken);

    return (
      DateTime.fromISO(tokenObject.issuedAt).plus({ minute: 20 }) >
      DateTime.now()
    );
  } catch {
    return false;
  }
};

export const storeAuthToken = (authToken: string | null) => {
  localStorage.setItem('authToken', authToken ?? '');
};

// TODO
export const loadAuthToken = (): string =>
  localStorage.getItem('authToken') ?? '';

export const getEmptyTokenPayload = (): TokenPayload => ({
  userID: '',
  username: '',
  email: '',
  authorizedPipelineStages: [],
  roles: [],
});

export const getTokenPayload = (): TokenPayload => {
  try {
    const authToken = JSON.parse(loadAuthToken());

    return authToken.payload ?? getEmptyTokenPayload();
  } catch {
    return getEmptyTokenPayload();
  }
};

export const getUserID = (): string => getTokenPayload().userID;
export const getUsername = (): string => getTokenPayload().username;
export const getAuthorizedPipelineStages = (): string[] =>
  getTokenPayload().authorizedPipelineStages;
