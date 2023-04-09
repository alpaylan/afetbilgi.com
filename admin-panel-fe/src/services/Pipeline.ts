import { PipelineStage } from '../interfaces/Pipeline';
import { mockPipelineStages } from '../mocks/Pipeline';

export const getPipelineStages = async (): Promise<PipelineStage[]> => {
  return mockPipelineStages;
};

export const savePipelineStages = async (): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};
