import { Assignment } from '../interfaces/Assignment';
import { mockAssignments } from '../mocks/Assignment';

export const getAssignments = async (): Promise<Assignment[]> => {
  return mockAssignments;
};
