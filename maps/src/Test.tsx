import { filterType } from "./helpers/filters";
import { useMarkers } from "./hooks";

export default function Test() {

    const data = useMarkers()
    const filteredMapData = filterType(data.map_data, "city-accommodation | gathering-list | help-item-list | phone-number-list | useful-links | beneficial-articles | stem-cell-donation | data-vet | food-items");
    console.log(filteredMapData)

    return(<></>)
}