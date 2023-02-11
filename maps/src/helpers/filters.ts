import { MarkerData} from "../hooks";
import { slug } from "./slug"

const isOneOfTypes = (item: MarkerData["map_data"][0], types: string[]) => {
  return types.includes(item.type);
}

export const filterMultipleTypes = (data: MarkerData["map_data"], types: string[]) =>  {
  return data.filter(item => isOneOfTypes(item, types));
}

const doesContainInAttributes = (item: MarkerData["map_data"][any]["data"][any], searchString: string) => {
  const itemCity = (item.city && slug(item.city)) || "";
  const itemCounty = (item.county && slug(item.county)) || "";
  const itemName = (item.name && slug(item.name)) || "";

  const fullAddress = slug(`${itemName}${itemCity}${itemCounty}`);
  const stringsToSearch = searchString.split("-");
  return stringsToSearch.some(string => fullAddress.includes(string));
}

export const searchText = (data: MarkerData["map_data"], searchString: string) => {
  if (!searchString) return data;

  const searchStringLower = slug(searchString);

  return data.map(item => ({
    ...item,
    data: item.data.filter(subitem => doesContainInAttributes(subitem, searchStringLower))
  }));
}
