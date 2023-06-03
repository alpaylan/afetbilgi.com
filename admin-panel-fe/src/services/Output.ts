import { OutputSummary } from '../interfaces/Output/Output';
import { mockOutputSummaries } from '../mocks/Output';

export const getOutputSummaries = async (): Promise<OutputSummary[]> =>
  mockOutputSummaries;

export const toggleOutputState = async (id: string): Promise<void> => {
  console.log('Toggling ', id);
};
