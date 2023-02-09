import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './utils/locales/en/translation.json';
import translationTR from './utils/locales/tr/translation.json';
import translationKU from './utils/locales/ku/translation.json';
import translationAR from './utils/locales/ar/translation.json';
import LocalStorage from './utils/LocalStorage';
import { Language } from './utils/types';

// the translations
const resources = {
  en: {
    translation: translationEN,
  },
  tr: {
    translation: translationTR,
  },
  ku: {
    translation: translationKU,
  },
  ar: {
    translation: translationAR,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng:
      LocalStorage.getObject(LocalStorage.LOCAL_STORAGE_LANGUAGE) ??
      Language.TR,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
