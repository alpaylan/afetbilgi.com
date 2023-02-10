import axios from "axios";
import { useQuery } from "react-query";

export interface MarkerData {
  update_time: number;
  map_data: {
    type: string;
    data: {
      name: string;
      url?: string;
      latitude: number;
      longitude: number;
      maps_url?: string;
      phone_number?: string;
      city?: string;
      county?: string;
    }[];
  }[];
}

export const useMarkers = () => useQuery('map-data', async () => {
  const response = await axios.get('https://cdn.afetbilgi.com/maps/latest.json');

  return response.data as MarkerData;
});

