import { ColumnType } from '../interfaces/TableDefinition';
import { generateRandomSentence, generateRandomString } from './Misc';

const generateRandomTextColumn = (): string => {
  const wordCount = 1 + Math.floor(Math.random() * 10);
  return generateRandomSentence(wordCount);
};

// Form: part1@part2.com
const generateRandomLinkColumn = (): string => {
  const part1Length = 3 + Math.floor(Math.random() * 10);
  const part2Length = 3 + Math.floor(Math.random() * 10);

  return `${generateRandomString(part1Length)}@${generateRandomString(
    part2Length,
  )}.com`;
};

// Form: +country xxx xxx xx xx
const generateRandomPhoneNumberColumn = (): string => {
  const countryCode = 1 + Math.floor(Math.random() * 999);

  return `+${countryCode.toString()} ${Math.floor(
    Math.random() * 1000,
  )} ${Math.floor(Math.random() * 1000)} ${Math.floor(
    Math.random() * 100,
  )} ${Math.floor(Math.random() * 100)}`;
};

// 'true' or 'false'
const generateRandomBooleanColumn = (): string =>
  Math.random() > 0.5 ? 'true' : 'false';

export const generateRandomNumber = (): string =>
  (100 * Math.random()).toFixed(2);

export const generateRandomColumnValue = (columnType: ColumnType): string => {
  switch (columnType) {
    case ColumnType.TEXT:
      return generateRandomTextColumn();
    case ColumnType.LINK:
      return generateRandomLinkColumn();
    case ColumnType.PHONE_NUMBER:
      return generateRandomPhoneNumberColumn();
    case ColumnType.BOOLEAN:
      return generateRandomBooleanColumn();
    case ColumnType.NUMBER:
      return generateRandomNumber();
    default:
      return generateRandomString(Math.floor(Math.random() * 10));
  }
};
