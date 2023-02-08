/* eslint-disable no-restricted-syntax */

import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { TreeNodeType } from './variables/TreeNode';

const baseQuestionData = axios.get(`https://raw.githubusercontent.com/alpaylan/afetbilgi.com/main/data/all.combined.1.json?v=1`)
  .then(res => res.data);

export const useQuestionData = (paths: string[]) => {
  const { i18n } = useTranslation();
  return useQuery(
    `questionData-${i18n.language}-${paths.join(',')}`,
    async () => {
      let currNode = await baseQuestionData;

      for (const path of paths) {
        if (!currNode || currNode.type !== TreeNodeType.NODE_TYPE_QUESTION) {
          throw new Error('this is not a question node');
        }

        const decodedPath = decodeURIComponent(path);

        const foundNode = currNode.options.find(
          (o: any) => o.name_tr === decodedPath || o.name === decodedPath,
        );

        currNode = (foundNode?.[`value_${i18n.language}`] ||
          foundNode?.value) as any;
      }

      return currNode;
    },
  );
};
