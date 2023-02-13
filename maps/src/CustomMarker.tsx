import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Marker, Popup } from 'react-leaflet';
import { MarkerData } from './hooks';
import { dataTypeToLabel } from './utils/DataType';
import { StatusLevel, statusLevelToColor, statusLevelToString, statusTypeToString } from './utils/Status';
import getIcon from './utils/icon';

function DataItem({ text, value }: { text: string, value: string }) {
  if (!value || value === "undefined") return null;

  return (
    <Box sx={{ mt: 1 }}>
      <b>{text}:</b> {value}
    </Box>
  )
}

export default function CustomMarker({ item, size } : { item: MarkerData[any], size: number }) {
  return (
    <Marker
      icon={getIcon(item.type, size)}
      position={[item.latitude, item.longitude]}
    >
      <Popup>
        <Box sx={{ fontSize: "16px" }}>
          {item.name && <Box sx={{ m: "auto" }}><b>{item.name}</b></Box>}
          <Box sx={{ mb: 2  }}>{dataTypeToLabel[item.type].name_tr}</Box>
          <DataItem text="Adres" value={`${item.city}${item.county ? `, ${item.county}` : ""}`} />
          {item.phone_number && <DataItem text="Telefon" value={item.phone_number} /> }
          {item.lastUpdateTime && <DataItem text='Güncelleme Tarihi' value={item.lastUpdateTime} /> }
          {item.status && <DataItem text="Durum" value={item.status ? "AÇIK" : "KAPALI"} /> }
          {item.lastSiteStatuses && item.lastSiteStatuses.map((status, index) => (
            <Box key={index} sx={{ mt: 1 }}>
              <Typography display='inline'><b>{statusTypeToString[status.siteStatusType]}: </b></Typography>
              {(status.siteStatusLevel !== StatusLevel.NO_NEED_REQUIRED && status.siteStatusLevel !== StatusLevel.UNKNOWN_LEVEL) &&
              <Typography display='inline' sx={{color: statusLevelToColor[status.siteStatusLevel]}}><b>{statusLevelToString[status.siteStatusLevel]}</b></Typography>}
              {(status.siteStatusLevel === StatusLevel.NO_NEED_REQUIRED || status.siteStatusLevel === StatusLevel.UNKNOWN_LEVEL) &&
              <Typography display='inline' sx={{color: statusLevelToColor[status.siteStatusLevel]}}>{statusLevelToString[status.siteStatusLevel]}</Typography>}
            </Box>
          ))}
          {item.lastUpdate && <DataItem text="Güncelleme Notu" value={item.lastUpdate} /> }
          {item.description && <Box sx={{mt: 1}}>{item.description}</Box>}

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
    </Marker>
  )
}
