import { DataFilters, DataStatistics, Row } from '../interfaces/Data';
import { PipelineStage } from '../interfaces/Pipeline';
import { TableDefinition } from '../interfaces/TableDefinition';
import { getUsername } from './Auth';

export const getDefaultDataStatistics = (): DataStatistics => ({
  tableCount: 0,
  rowCount: 0,
});

export const getDefaultDataFilters = (): DataFilters => ({
  selectedTableNames: [],
  selectedStages: [],
  onlyAssignedToMe: false,
});

export const getEmptyRow = (
  tableDefinition: TableDefinition,
  pipelineStages: PipelineStage[],
): Row => ({
  id: '',
  columns: tableDefinition.columns.map(() => ''),
  lastUpdatedBy: '',
  lastUpdatedAt: new Date(),
  assignedTo: getUsername(),
  stage: pipelineStages[0].id,
});
