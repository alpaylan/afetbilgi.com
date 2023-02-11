import axios from "axios";
import { useQuery } from "react-query";

export interface MarkerData {
  update_time: number;
  map_data: {
    id: string;
    type: string;
    name: string;
    url?: string;
    latitude: number;
    longitude: number;
    maps_url?: string;
    phone_number?: string;
    city?: string;
    county?: string;
  }[];
}

export const useMarkers = () => useQuery('map-data', async () => {
  const response = await axios.get('https://cdn.afetbilgi.com/maps/latest.json');

  const pointsSet = new Set();
  response.data.map_data.forEach((x: any) => {
    x.data.forEach((y: any) => {
      if (pointsSet.has(`${y.latitude},${y.longitude}`)) {
        y.longitude = String(Number(y.longitude) + 0.0003);
      }

      pointsSet.add(`${y.latitude},${y.longitude}`);

      y.type = x.type;
    });
  });

  response.data.map_data = response.data.map_data
    .map((x: any) => x.data).flat();

  response.data.map_data = response.data.map_data
    .map((x: any, index: number) => ({ ...x, id: String(index) })).flat();

  return response.data as MarkerData;
});

