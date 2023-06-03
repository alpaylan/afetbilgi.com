import { NewPage } from '../interfaces/Output/Page';

export const addNewPage = async (pageToAdd: NewPage): Promise<void> => {
  console.log('Adding ', pageToAdd);
};
