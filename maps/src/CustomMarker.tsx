import { Box, Button } from '@mui/material';
import React, { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { MarkerData } from './hooks';
import { dataTypeToLabel } from './utils/DataType';
import getIcon from './utils/icon';

function DataItem({ text, value }: { text: string, value: string }) {
  if (!value || value === "undefined") return null;

  return (
    <Box sx={{ mt: 1 }}>
      <b>{text}:</b> {value}
    </Box>
  )
}
export const MarkerPopup = ({ item }: { item: MarkerData['map_data'][any] }) => {
  return (
    <Popup>
      <Box sx={{ fontSize: "16px" }}>
        {item.name && <Box sx={{ m: "auto" }}><b>{item.name}</b></Box>}
        <Box sx={{ mb: 2 }}>{dataTypeToLabel[item.type].name_tr}</Box>
        <DataItem text="Adres" value={`${item.city}${item.county ? `, ${item.county}` : ""}`} />
        <DataItem text="Telefon" value={item.phone_number || ''} />
        <Box sx={{ mt: 2 }}>
          <Button
            sx={{ fontSize: "inherit" }}
            variant='outlined'
            href={item.maps_url ? item.maps_url : `https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`}
            target="_blank"
            fullWidth
          >
            Haritada Göster
          </Button>
        </Box>

        {item.url && (
          <Box sx={{ mt: 1 }}>
            <Button
              sx={{ fontSize: "inherit" }}
              target="_blank"
              variant='outlined'
              href={item.url}
              fullWidth
            >
              Kaynak
            </Button>
          </Box>
        )}
      </Box>
    </Popup>
  );
};
export function CustomMarker({ type, lat, lon, children } : { lat:number, lon:number, type:string, children: any }) {
  const icon = useMemo(() => getIcon(type), [type]);
  return (
    <Marker
      icon={icon}
      position={[lat, lon]}
    >
      {children}
    </Marker>
  )
}
