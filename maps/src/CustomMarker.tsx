import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { CircleMarker, Popup, useMapEvents } from 'react-leaflet';
import { dataTypeToColor, dataTypeToLabel } from './Map';

import "./Map.css"

export default function CustomMarker({ subitem, item } : { item: any, subitem: any }) {
  const [zoomLevel, setZoomLevel] = React.useState(15);
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
        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{ fontWeight: 'bold' }}
            display="inline"
            >
            {subitem.name}
          </Typography>
          {subitem.name && <Typography display="inline"> - </Typography>}
          <Typography display="inline">
            {dataTypeToLabel[item.type].name_tr}
          </Typography>
        </Box>
        <Stack gap={1}>
          {subitem.city && <Box>
            <Typography
              display="inline"
              sx={{ fontWeight: 'bold', pr: 1 }}
            >
              Adres: 
            </Typography>
            <Typography
              display="inline">
              {`${subitem.city}${subitem.county ? `, ${subitem.county}` : ""}`}
            </Typography>
          </Box>}
          {subitem.phone_number && <Box>
            <Typography
              display="inline"
              sx={{ fontWeight: 'bold', pr: 1 }}
            >
              Telefon: 
            </Typography>
            <Typography 
              display="inline">
              {subitem.phone_number}
            </Typography>
          </Box>}
          {subitem.maps_url && <Box>
            <Button
              variant='outlined'
              href={subitem.maps_url}
              >
              Haritada Göster
            </Button>
          </Box>}
          {subitem.url && <Box>
            <Button
              variant='outlined'
              href={subitem.url}
              >
              Kaynak
            </Button>
          </Box>}
        </Stack>
      </Popup>
    </CircleMarker>
  )
}
