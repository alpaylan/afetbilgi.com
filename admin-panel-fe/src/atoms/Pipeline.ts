import { atom } from 'recoil';
import { PipelineStage } from '../interfaces/Pipeline';

export const pipelineStages = atom({
  key: 'pipelineStages',
  default: [] as PipelineStage[],
});
