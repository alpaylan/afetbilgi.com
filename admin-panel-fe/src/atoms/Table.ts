import { atom } from 'recoil';
import { TableDefinition } from '../interfaces/TableDefinition';

export const tableDefinitions = atom({
  key: 'tableDefinitions',
  default: [] as TableDefinition[],
});
