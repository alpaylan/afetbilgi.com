import { Assignment } from '../interfaces/Assignment';
import { mockAssignments } from '../mocks/Assignment';

export const getAssignments = async (): Promise<Assignment[]> => {
  return mockAssignments;
};

export const assignRow = async (
  tableName: string,
  rowID: string,
): Promise<void> => {
  console.log('Assigning ', tableName, ' ', rowID);
};
