import { atom } from 'recoil';
import { defaultLocaleConfig } from '../constants/Locale';

export const localeConfig = atom({
  key: 'localeConfig',
  default: defaultLocaleConfig,
});
