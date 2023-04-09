import { PipelineStage } from '../interfaces/Pipeline';

export const mockPipelineStages: PipelineStage[] = [
  {
    id: 'DRAFT',
    name: 'Draft',
  },
  {
    id: 'TRANSLATION',
    name: 'Translation',
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
