import { Language } from './types';

export const parseStringToJson = (objAsString: string) => {
  try {
    const obj = JSON.parse(objAsString);

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too. Thankfully, null is falsy, so this suffices:
    if (obj && (typeof obj === 'object' || typeof obj === 'string')) {
      return obj;
    }
  } catch (e) {
    console.log(e);
  }

  return undefined;
};

export const LANGUAGES: { key: Language; name: string }[] = [
  { key: Language.TR, name: 'Türkçe' },
  { key: Language.EN, name: 'English' },
  { key: Language.KU, name: 'Kurdish' },
  { key: Language.AR, name: 'العربية' },
];
