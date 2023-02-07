/* eslint-disable no-restricted-syntax */

import axios from "axios";
import { useQuery } from "react-query";

import { TreeNodeType } from "./variables/TreeNode";

const baseQuestionData = axios.get(`https://raw.githubusercontent.com/alpaylan/afetbilgi.com/main/data/all.json?v=2.3`)
  .then(res => res.data);

export const useQuestionData = (paths: string[]) => useQuery(`questionData-${paths.join(',')}`, async () => {
  let currNode = await baseQuestionData;

  for (const path of paths) {
    if (!currNode || currNode.type !== TreeNodeType.NODE_TYPE_QUESTION) {
      throw new Error('this is not a question node');
    }

    const decodedPath = decodeURIComponent(path);

    let nextNode = currNode.options.find((o: any) => o.name === decodedPath)?.value as any;
    if (!nextNode && Number.isInteger(Number(decodedPath))) {
      nextNode = currNode.options[Number(decodedPath)]?.value as any;
    }

    currNode = nextNode;
  }

  return currNode;
});
