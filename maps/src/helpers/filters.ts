import { MarkerData} from "../hooks";



export const filterType = (data: MarkerData["map_data"], type: string) =>  {
    return data.filter (item => isType(item, type))
}

export const filterMultipleTypes = (data: MarkerData["map_data"], types: string[]) =>  {
    return data.filter (item => isOneOfTypes(item, types))
}

const isOneOfTypes = (item : MarkerData["map_data"][any], types: string[]) => {
    types.forEach(type => {
        if(item?.type === type) return true;
    })
    return false; 
}

const isType = (item : MarkerData["map_data"][any], type: string) => {
    return item?.type === type;
}

/*
export const searchNames = ( data: MarkerData, searchName: string ): MarkerData => {

    const filteredData = data.map_data.data.filter( item => "" )

} 

const doesExistName = ( data : MapDataItem, searchName: string ): boolean => {

}

*/



