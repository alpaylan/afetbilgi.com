import { TableDefinition } from '../interfaces/TableDefinition';
import { mockTableDefinitions } from '../mocks/TableDefinition';

// TODO
export const createTableDefinition = async (
  newTableDefinition: TableDefinition,
): Promise<void> => {
  console.log('Creating new table definition: ', newTableDefinition);
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

// TODO
export const getTableDefinitions = async (): Promise<TableDefinition[]> => {
  return mockTableDefinitions;
};

export const updateTableDefinition = async (
  tableDefinitionToUpdate: TableDefinition,
): Promise<void> => {
  console.log('Updating table definition: ', tableDefinitionToUpdate);
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

// TODO
export const deleteTableDefinition = async (
  tableName: string,
): Promise<void> => {
  console.log('Deleting table ', tableName);
  return new Promise((resolve) => setTimeout(resolve, 1000));
};
