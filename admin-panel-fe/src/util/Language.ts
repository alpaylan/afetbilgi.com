import { Language } from '../interfaces/Language';

export const getStoredLanguage = (): string =>
  localStorage.getItem('language') ?? Language.EN;
