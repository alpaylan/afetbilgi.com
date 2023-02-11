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

  const pointsSet = new Set();
  response.data.map_data.forEach((x: any) => {
    x.data.forEach((y: any) => {
      if (pointsSet.has(`${y.latitude},${y.longitude}`)) {
        y.latitude = String(Number(y.latitude) + 0.0001);
      }

      pointsSet.add(`${y.latitude},${y.longitude}`);
    });
  });

  return response.data as MarkerData;
});

