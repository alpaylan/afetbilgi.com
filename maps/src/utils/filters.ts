/* eslint-disable no-restricted-syntax */
import Fuse from 'fuse.js';
import { MarkerData } from "../hooks";

export function buildSearchIndex(data: MarkerData["map_data"]) {
  return new Fuse(data, {
    keys: ['type', 'name', 'city', 'county'],
    findAllMatches: true,
  });
}

const isOneOfTypes = (item: MarkerData["map_data"][0], types: string[]) => {
  return types.includes(item.type);
}

export const filterMultipleTypes = (data: MarkerData["map_data"], types: string[]) =>  {
  return data.filter(item => isOneOfTypes(item, types));
}

export const searchText = (index: Fuse<MarkerData["map_data"][any]>, searchString: string) => {
  return index.search(searchString);
}
