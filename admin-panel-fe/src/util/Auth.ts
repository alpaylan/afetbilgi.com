import { DateTime } from 'luxon';

export const isValidToken = (authToken: string | null): boolean => {
  if (!authToken) {
    return false;
  }

  return DateTime.fromISO(authToken).plus({ minute: 20 }) > DateTime.now();
};

export const storeAuthToken = (authToken: string | null) => {
  localStorage.setItem('authToken', authToken ?? '');
};

export const loadAuthToken = (): string =>
  localStorage.getItem('authToken') ?? '';

export const getUsername = (): string => 'Eren Erişken';
