import { atom } from 'recoil';
import { getDefaultDataFilters } from '../util/Data';

export const dataFilters = atom({
  key: 'dataFilters',
  default: getDefaultDataFilters(),
});
