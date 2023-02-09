import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useMarkers } from './hooks';

export default function Map() {
  const markers = useMarkers();

  return (
    <MapContainer center={[37.569442, 37.190833]} zoom={8} scrollWheelZoom={false} style={{ height: '100vh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, i) => (
        <Marker key={`marker-${i}`} position={[marker.lat, marker.lng]}>
          <Popup>Selam</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
