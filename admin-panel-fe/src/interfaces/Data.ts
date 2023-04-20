export interface DataStatistics {
  tableCount: number;
  rowCount: number;
}

export interface DataFilters {
  selectedTableNames: string[];
  selectedStages: string[];
  onlyAssignedToMe: boolean;
}
