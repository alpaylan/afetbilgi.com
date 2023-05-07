import { TableDefinition } from './TableDefinition';

export interface DataStatistics {
  tableCount: number;
  rowCount: number;
}

export interface DataFilters {
  selectedTableNames: string[];
  selectedStages: string[];
  onlyAssignedToMe: boolean;
}

export interface Row {
  id: string;
  columns: string[];
  lastUpdatedBy: string;
  lastUpdatedAt: Date;
  stage: string;
  assignedTo?: string;
}

export interface TableData {
  tableName: string;
  tableDefinition: TableDefinition;
  rows: Row[];
}
