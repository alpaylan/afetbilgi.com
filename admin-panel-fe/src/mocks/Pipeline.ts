import { PipelineStage } from '../interfaces/Pipeline';

export const mockPipelineStages: PipelineStage[] = [
  {
    id: 'DRAFT',
    name: 'Draft',
  },
  {
    id: 'INSPECTION',
    name: 'Inspection',
  },
  {
    id: 'VERIFICATION',
    name: 'Verification',
  },
  {
    id: 'READY',
    name: 'Ready',
  },
];
