import { Box, CircularProgress } from '@mui/material';
import { LatLngTuple } from 'leaflet';
import React, { useEffect, useMemo, useState } from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useMarkers } from './hooks';

export default function Map() {
  const markers = useMarkers();

  const [selfPosition, setSelfPosition] = useState<GeolocationPosition | null>(null);
  const selfLocation = useMemo(() => [selfPosition?.coords.latitude ?? 0, selfPosition?.coords.longitude ?? 0] as LatLngTuple, [selfPosition]);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition((position: GeolocationPosition) => {
      setSelfPosition(position);
    });
  }, []);

  // Center here: 37.569442, 37.190833

  if (!selfPosition) {
    return (
      <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <MapContainer center={selfLocation} zoom={14} maxZoom={20} scrollWheelZoom={true} style={{ height: '100vh' }}>
      <TileLayer
       attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {selfLocation && <>
        <Circle center={selfLocation} weight={1} color="blue" fillColor="blue" fillOpacity={1} radius={100}></Circle>
      </>}

      {markers.map((marker, i) => (
        <Marker key={`marker-${i}`} position={[marker.lat, marker.lng]}>
          <Popup>Selam</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
