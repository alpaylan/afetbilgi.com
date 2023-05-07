import { TableDefinition } from '../interfaces/TableDefinition';

export const getDefaultTableDefinition = (): TableDefinition => ({
  name: '',
  columns: [],
  lastUpdatedBy: '',
  lastUpdatedAt: new Date(),
});
