import { Assignment } from '../interfaces/Assignment';
import { mockPipelineStages } from './Pipeline';
import { mockTableDefinitions } from './TableDefinition';

export const mockAssignments: Assignment[] = [
  {
    stageID: mockPipelineStages[1].id,
    tableName: mockTableDefinitions[0].name,
    rowCount: 27,
  },
  {
    stageID: mockPipelineStages[1].id,
    tableName: mockTableDefinitions[1].name,
    rowCount: 31,
  },
  {
    stageID: mockPipelineStages[2].id,
    tableName: mockTableDefinitions[2].name,
    rowCount: 20,
  },
];
