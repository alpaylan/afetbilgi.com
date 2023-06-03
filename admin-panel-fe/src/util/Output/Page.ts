import { NewPage } from '../../interfaces/Output/Page';

export const getDefaultNewPage = (): NewPage => ({
  name: 'New Page',
  questions: [],
  leafs: [],
});
