import { isEmpty } from 'lodash';
import {
  DataFilters,
  DataStatistics,
  Row,
  TableData,
} from '../interfaces/Data';
import { TableDefinition } from '../interfaces/TableDefinition';
import { mockDataStatistics } from '../mocks/Data';
import { mockPipelineStages } from '../mocks/Pipeline';
import { mockTableDefinitions } from '../mocks/TableDefinition';
import { mockUsers } from '../mocks/User';
import { getUserID } from '../util/Auth';
import { generateRandomColumnValue } from '../util/Column';
import { getRandomElement, getRandomPastTime } from '../util/Misc';

export const getDataStatistics = async (): Promise<DataStatistics> =>
  mockDataStatistics;

// TODO: Replace mock implementation
export const getData = async (filters: DataFilters): Promise<TableData[]> => {
  const tableDataList: TableData[] = [];
  filters.selectedTableNames.forEach((tableName) => {
    const tableDefinition = mockTableDefinitions.find(
      (definition) => definition.name === tableName,
    );
    if (!tableDefinition) {
      return;
    }

    const rowCount = Math.floor(Math.random() * 1000);
    const rows: Row[] = [];
    for (let i = 0; i < rowCount; i += 1) {
      const assignedTo =
        Math.random() > 0.5 ? undefined : getRandomElement(mockUsers).id;

      rows.push({
        id: i.toString(),
        columns: tableDefinition.columns.map((column) =>
          generateRandomColumnValue(column.type),
        ),
        lastUpdatedBy: getRandomElement(mockUsers).name,
        lastUpdatedAt: getRandomPastTime(),
        stage: isEmpty(filters.selectedStages)
          ? getRandomElement(mockPipelineStages).id
          : getRandomElement(filters.selectedStages),
        assignedTo: filters.onlyAssignedToMe ? getUserID() : assignedTo,
      });
    }

    const tableData: TableData = { tableName, tableDefinition, rows };
    tableDataList.push(tableData);
  });
  return tableDataList;
};

export const updateRow = async (
  tableDefinition: TableDefinition,
  row: Row,
  locale: string,
): Promise<void> => {
  console.log('Updating ', tableDefinition, ' ', row, ' locale ', locale);
};

export const createRow = async (
  tableDefinition: TableDefinition,
  row: Row,
  locale: string,
): Promise<void> => {
  console.log('Creating ', tableDefinition, ' ', row, ' locale ', locale);
};

export const moveRowToPreviousStage = async (
  tableDefinition: TableDefinition,
  row: Row,
): Promise<void> => {
  console.log('Moving to previous stage: ', tableDefinition, ' ', row);
};

export const uploadDataCSV = async (
  tableDefinition: TableDefinition,
  file: File,
): Promise<number> => {
  console.log('Uploading: ', tableDefinition, ' ', file);
  return 42;
};
