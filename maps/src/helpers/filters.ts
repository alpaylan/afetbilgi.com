import { MarkerData} from "../hooks";



export const filterType = (data: MarkerData["map_data"], type: string) =>  {
    return data.filter (item => isType(item, type))
}

export const filterMultipleTypes = (data: MarkerData["map_data"], types: string[]) =>  {
    return data.filter (item => isOneOfTypes(item, types))
}

const isOneOfTypes = (data : MarkerData["map_data"][0], types: string[]) => {
    for(let i = 0; i < types.length; i+=1) {
        if( data.type === types[i] ) {
            return true;
        }
    }
    return false; 

}

const isType = (data : MarkerData["map_data"][0], type: string) => {
    return type === data.type

}

/*
export const searchNames = ( data: MarkerData, searchName: string ): MarkerData => {

    const filteredData = data.map_data.data.filter( item => "" )

} 

const doesExistName = ( data : MapDataItem, searchName: string ): boolean => {

}

*/



