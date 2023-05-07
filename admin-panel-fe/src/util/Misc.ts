import { DateTime } from 'luxon';

export const getRandomElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

export const generateRandomString = (length: number): string => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const generateRandomSentence = (wordCount: number): string => {
  const lipsum =
    'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do ' +
    'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam ' +
    'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu ' +
    'fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in ' +
    'culpa qui officia deserunt mollit anim id est laborum.';

  const lipsumWords = lipsum.split(' ');

  const sentence: string[] = [];
  for (let i = 0; i < wordCount; i += 1) {
    sentence.push(getRandomElement(lipsumWords));
  }

  return sentence.join(' ');
};

export const getRandomPastTime = (): Date =>
  DateTime.now()
    .minus({ hour: 300 * Math.random() })
    .toJSDate();
