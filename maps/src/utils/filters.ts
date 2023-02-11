/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */

import Fuse from 'fuse.js';
import { MarkerData } from "../hooks";
import { dataTypeToLabel } from './DataType';

export function buildSearchIndex(data: MarkerData["map_data"]) {
  for (const item of data) {
    (item as any).labels = dataTypeToLabel[item.type];
  }

  return new Fuse(data, {
    keys: ['labels.name_tr', 'labels.name_en', 'labels.name_ar', 'labels.name_ku', 'name', 'city', 'county'],
    threshold: 0.3,
  });
}

export const filterMultipleTypes = (data: MarkerData["map_data"], types: string[]) =>  {
  const typesSet = new Set(types);

  return data.filter(item => typesSet.has(item.type));
}


export const searchText = (index: Fuse<MarkerData["map_data"][any]>, searchString: string) => {
  return index.search(searchString);
}
