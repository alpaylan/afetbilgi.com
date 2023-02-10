import { MarkerData} from "../hooks";



export const filterType = (data: MarkerData["map_data"], type: string) =>  {
    return data.filter (item => isType(item, type))
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



