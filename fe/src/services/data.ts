import { QuestionNode } from '../interfaces/TreeNode';
import mockData from '../data/mockQuestion';

export const getData = async (): Promise<QuestionNode> => {
  return mockData;
};
