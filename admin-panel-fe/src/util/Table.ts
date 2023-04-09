import { TableDefinition } from '../interfaces/Table';

export const getDefaultTableDefinition = (): TableDefinition => ({
  name: '',
  columns: [],
  lastUpdatedBy: '',
  lastUpdatedAt: new Date(),
});
