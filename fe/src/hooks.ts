/* eslint-disable no-restricted-syntax */

import axios from "axios";
import { useQuery } from "react-query";

import { TreeNodeType } from "./variables/TreeNode";

const baseQuestionData = axios.get(`https://raw.githubusercontent.com/alpaylan/afetbilgi.com/main/data/all.1.json?v=3.3`)
  .then(res => res.data);

const baseQuestionDataEN = axios.get(`https://raw.githubusercontent.com/alpaylan/afetbilgi.com/main/data/all.1.en.json?v=3.3`)
.then(res => res.data);

export const useQuestionData = (lang: string | undefined, paths: string[]) => useQuery(`questionData-${lang}-${paths.join(',')}`, async () => {
  let currNode = lang === 'en' ? await baseQuestionDataEN : await baseQuestionData;

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
