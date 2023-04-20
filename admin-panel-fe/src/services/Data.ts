import { DataStatistics } from '../interfaces/Data';
import { mockDataStatistics } from '../mocks/Data';

export const getDataStatistics = async (): Promise<DataStatistics> =>
  mockDataStatistics;
