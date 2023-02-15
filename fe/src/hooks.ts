/* eslint-disable no-restricted-syntax */

import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { TreeNodeType } from './variables/TreeNode';

const d = new Date();
const version = d.getDate().toString().concat(".", d.getHours().toString(), d.getMinutes().toString());
const baseQuestionData = axios
  .get(process.env.REACT_APP_TEST_DATA ?
    `/latest.json?${version.concat(d.getSeconds().toString())}` :
    `https://cdn.afetbilgi.com/latest.json?v=${version}`)
  .then((res) => res.data);

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

export const useCitiesData = () => {
  const cities = axios
  .get("https://cdn.afetbilgi.com/md-pdf/index.json")
  .then((res) => res.data);

  return useQuery(
    `citiesData`,
    async () => {
      return cities;
    }
  );
}
