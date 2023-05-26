import { hasFlag } from 'country-flag-icons';

export const getCountryNameFromLocale = (locale: string): string | undefined =>
  locale.split('-').find((word) => hasFlag(word.toUpperCase()));
