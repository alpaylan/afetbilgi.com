import { LocaleConfig } from '../interfaces/Locale';
import { mockLocaleConfig } from '../mocks/Locale';

export const addSupportedLocale = async (
  localeToAdd: string,
): Promise<void> => {
  console.log('Adding locale ', localeToAdd);
};

export const getLocaleConfig = async (): Promise<LocaleConfig> =>
  mockLocaleConfig;

export const deleteSupportedLocale = async (
  localeToDelete: string,
): Promise<void> => {
  console.log('Deleting locale ', localeToDelete);
};
