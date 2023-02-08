/* eslint-disable no-restricted-syntax */

import axios from "axios";
import { useQuery } from "react-query";

import { TreeNodeType } from "./variables/TreeNode";

const baseQuestionData = axios.get(`https://raw.githubusercontent.com/alpaylan/afetbilgi.com/main/data/all.combined.1.json?v=1`)
  .then(res => res.data);

export const useQuestionData = (lang: string | undefined, paths: string[]) => useQuery(`questionData-${lang}-${paths.join(',')}`, async () => {
  let currNode = await baseQuestionData;

  for (const path of paths) {
    if (!currNode || currNode.type !== TreeNodeType.NODE_TYPE_QUESTION) {
      throw new Error('this is not a question node');
    }

    const decodedPath = decodeURIComponent(path);

    const foundNode = currNode.options.find((o: any) => o.name_tr === decodedPath || o.name === decodedPath);

    currNode = (foundNode?.[`value_${lang}`] || foundNode?.value) as any;
  }

  return currNode;
});
