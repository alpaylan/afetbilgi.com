export interface MarkerData {
  update_time: number;
  map_data: {
    type: string;
    data: {
      name: string;
      address?: string;
      phone?: string;
      email?: string;
      website?: string;
      description?: string;
      lat: number;
      lng: number;
    }[];
  }[];
}

export const useMarkers = (): MarkerData => {
  return {
    "update_time": 0,
    "map_data": [
        {
            "type": "city-accommodation | gathering-list | help-item-list | phone-number-list | useful-links | beneficial-articles | stem-cell-donation | data-vet | food-items",
            "data": [
                {
                    "name": "name",
                    "address": "address",
                    "phone": "phone",
                    "email": "email",
                    "website": "website",
                    "description": "description",
                    "lat": 37.569442,
                    "lng": 37.190833
                },
            ]
        },
    ]
  }
}
