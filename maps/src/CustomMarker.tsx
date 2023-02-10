import { Box, Button } from '@mui/material';
import React from 'react';
import { CircleMarker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { dataTypeToColor, dataTypeToLabel } from './Map';

import "./Map.css"

export default function CustomMarker({ subitem, item } : { item: any, subitem: any }) {
  const [zoomLevel, setZoomLevel] = React.useState(useMap().getZoom());
  const mapEvents = useMapEvents({
    zoomend: () => {
        setZoomLevel(mapEvents.getZoom());
    },
  });

  return (
    <CircleMarker
      center={[subitem.latitude, subitem.longitude]} 
      weight={1}
      color="black"
      fillColor={dataTypeToColor[item.type]}
      fillOpacity={1}
      radius={(zoomLevel ** 3) / 100}
    >
      <Popup>
        {subitem.name && <Box><b>{subitem.name} - </b></Box>}
        <Box sx={{ my: 1 }}><b>{dataTypeToLabel[item.type].name_tr}</b></Box>
        {subitem.city && <Box sx={{ my: 1 }}>Adres: {`${subitem.city}${subitem.county ? `, ${subitem.county}` : ""}`}</Box>}
        {subitem.phone_number && <Box sx={{ my: 1 }}>Telefon: {subitem.phone_number}</Box>}
        <Box sx={{ my: 1 }}>
          <Button
            variant='outlined'
            href={subitem.maps_url ? subitem.maps_url : `https://www.google.com/maps/search/?api=1&query=${subitem.latitude},${subitem.longitude}`}
          >
            Haritada Göster
          </Button>
        </Box>

        {subitem.url && (
          <Box sx={{ my: 1 }}>
            <Button
              target="_blank"
              variant='outlined'
              href={subitem.url}
              >
              Kaynak
            </Button>
          </Box>
        )}
      </Popup>
    </CircleMarker>
  )
}
