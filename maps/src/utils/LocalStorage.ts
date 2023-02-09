import { parseStringToJson } from './util';

export default class LocalStorage {
  static LOCAL_STORAGE_LANGUAGE = 'language';

  static storeObject(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getObject(key: string) {
    const objectString = localStorage.getItem(key) as string;
    const object = parseStringToJson(objectString);
    return object;
  }

  static removeObject(key: string) {
    return localStorage.removeItem(key);
  }

  static clear() {
    localStorage.removeItem(LocalStorage.LOCAL_STORAGE_LANGUAGE);
  }
}
