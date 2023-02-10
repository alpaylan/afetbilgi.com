import { Box, Button } from '@mui/material';
import React from 'react';
import { CircleMarker, Popup } from 'react-leaflet';
import { dataTypeToColor, dataTypeToLabel } from './Map';

import "./Map.css"

function DataItem({ text, value }: { text: string, value: string }) {
  if (!value || value === "undefined") return null;
  
  return (
    <Box sx={{ mt: 1 }}>
      <b>{text}:</b> {value}
    </Box>
  )
}

export default function CustomMarker({ subitem, item, radius } : { item: any, subitem: any, radius: number }) {
  return (
    <CircleMarker
      center={[subitem.latitude, subitem.longitude]} 
      weight={2}
      color="white"
      fillColor={dataTypeToColor[item.type]}
      fillOpacity={1}
      radius={radius}
    >
      <Popup>
        <Box sx={{ fontSize: "16px" }}>
          {subitem.name && <Box sx={{ m: "auto" }}><b>{subitem.name}</b></Box>}
          <Box sx={{ mb: 2  }}>{dataTypeToLabel[item.type].name_tr}</Box>
          <DataItem text="Adres" value={`${subitem.city}${subitem.county ? `, ${subitem.county}` : ""}`} />
          <DataItem text="Telefon" value={subitem.phone_numbern} />
          <Box sx={{ mt: 2 }}>
            <Button
              sx={{ fontSize: "inherit" }}
              variant='outlined'
              href={subitem.maps_url ? subitem.maps_url : `https://www.google.com/maps/search/?api=1&query=${subitem.latitude},${subitem.longitude}`}
              fullWidth
            >
              Haritada Göster
            </Button>
          </Box>

          {subitem.url && (
            <Box sx={{ mt: 1 }}>
              <Button
                sx={{ fontSize: "inherit" }}
                target="_blank"
                variant='outlined'
                href={subitem.url}
                fullWidth
                >
                Kaynak
              </Button>
            </Box>
          )}
        </Box>
      </Popup>
    </CircleMarker>
  )
}
