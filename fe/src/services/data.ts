import axios from 'axios';

import { QuestionNode } from '../interfaces/TreeNode';

export const getData = async (): Promise<QuestionNode> => {
  const res = await axios.get('http://raw.githubusercontent.com/alpaylan/afetbilgi.com/main/data/barinma.json');

  return res.data;
};
