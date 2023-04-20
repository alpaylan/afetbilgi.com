import { DataFilters, DataStatistics } from '../interfaces/Data';

export const getDefaultDataStatistics = (): DataStatistics => ({
  tableCount: 0,
  rowCount: 0,
});

export const getDefaultDataFilters = (): DataFilters => ({
  selectedTableNames: [],
  selectedStages: [],
  onlyAssignedToMe: false,
});
