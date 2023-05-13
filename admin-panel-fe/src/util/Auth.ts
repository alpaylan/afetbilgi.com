import { DateTime } from 'luxon';
import { TokenPayload } from '../interfaces/Auth';
import { mockUserTokenPayload } from '../mocks/Auth';

// TODO
export const isValidToken = (authToken: string | null): boolean => {
  if (!authToken) {
    return false;
  }

  return DateTime.fromISO(authToken).plus({ minute: 20 }) > DateTime.now();
};

export const storeAuthToken = (authToken: string | null) => {
  localStorage.setItem('authToken', authToken ?? '');
};

// TODO
export const loadAuthToken = (): string =>
  localStorage.getItem('authToken') ?? '';

export const getTokenPayload = (): TokenPayload => mockUserTokenPayload;

export const getUserID = (): string => getTokenPayload().userID;
export const getUsername = (): string => getTokenPayload().username;
export const getAuthorizedPipelineStages = (): string[] =>
  getTokenPayload().authorizedPipelineStages;
