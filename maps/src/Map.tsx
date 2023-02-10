import { Box, CircularProgress } from '@mui/material';
import { LatLngTuple } from 'leaflet';
import React, { useEffect, useMemo, useState } from 'react';
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';
import { useMarkers } from './hooks';

export enum DataType {
  CITY_ACCOMMODATION = 'map-city-accommodation',
  NEW_GATHERING_LIST = 'map-gathering-list',
  HELP_ITEM_LIST = 'map-help-item-list',
  PHONE_NUMBER_LIST = 'map-phone-number-list',
  STEM_CELL_DONATION = 'map-stem-cell-donation',
  DATA_VET = 'map-data-vet',
  FOOD_ITEMS = 'map-food-items',
  CONTAINER_PHARMACY = 'map-container-pharmacy',
  EVACUATION_POINTS = 'map-evacuation-points',
}

export const dataTypeToColor: { [k: string]: string } =
  {
    [DataType.CITY_ACCOMMODATION]: '#111111',
    [DataType.NEW_GATHERING_LIST]: '#222222',
    [DataType.HELP_ITEM_LIST]: '#666666',
    [DataType.STEM_CELL_DONATION]: '#777777',
    [DataType.DATA_VET]: '#333333',
    [DataType.FOOD_ITEMS]: '#444444',
    [DataType.PHONE_NUMBER_LIST]: '#888888',
    [DataType.CONTAINER_PHARMACY]: '#aaaaaa',
    [DataType.EVACUATION_POINTS]: '#555555',
  };


export default function Map() {
  const { data, isLoading } = useMarkers();

  const [selfPosition, setSelfPosition] = useState<GeolocationPosition | null>(null);
  const selfLocation = useMemo(() => [selfPosition?.coords.latitude ?? 0, selfPosition?.coords.longitude ?? 0] as LatLngTuple, [selfPosition]);
  // const selfLocation: [number, number] = [37.57713668904397, 36.92937651365644];

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition((position: GeolocationPosition) => {
      setSelfPosition(position);
    });
  }, []);

  if (!data || isLoading || !selfPosition) {
    return (
      <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <MapContainer center={selfLocation} zoom={15} maxZoom={20} scrollWheelZoom={true} style={{ height: '100vh' }}>
      <TileLayer
       attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data.map_data.map((item, i) => (
        item.data.map((subitem, j) => (
          <CircleMarker key={`marker-${i}-${j}`}
            center={[subitem.latitude, subitem.longitude]} weight={4} color="black"
            fillColor={dataTypeToColor[item.type]} fillOpacity={1} radius={10}
          >
            <Popup>
              <div>{subitem.name}</div>
              {subitem.description && <div>{subitem.description}</div>}
              {subitem.phone && <div><a href={`tel:${subitem.phone}`} target="_blank">{subitem.phone}</a></div>}
              {subitem.website && <div><a href={subitem.website} target="_blank">{subitem.website}</a></div>}
            </Popup>
          </CircleMarker>
        )).flat()
      ))}

      {selfLocation && <>
        <CircleMarker className="blink" center={selfLocation} weight={4} color="white" fillColor="blue" fillOpacity={1} radius={10} />
      </>}
    </MapContainer>
  );
}
