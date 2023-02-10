import { MarkerData} from "../hooks";
import { slug } from "./slug"

const isOneOfTypes = (item: MarkerData["map_data"][0], types: string[]) => {
  return types.includes(item.type);
}

export const filterMultipleTypes = (data: MarkerData["map_data"], types: string[]) =>  {
  return data.filter(item => isOneOfTypes(item, types));
}

const doesContainInAttributes = (item: MarkerData["map_data"][any]["data"][any], searchString: string) => {
  return (item.name && slug(item.name).includes(searchString));
}

export const searchText = (data: MarkerData["map_data"], searchString: string) => {
  if (!searchString) return data;

  const searchStringLower = slug(searchString);

  return data.map(item => ({
    ...item,
    data: item.data.filter(subitem => doesContainInAttributes(subitem, searchStringLower))
  }));
}
