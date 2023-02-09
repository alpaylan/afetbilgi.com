import React from 'react';
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import { MapContainer, Marker, Popup } from 'react-leaflet';
import { useMarkers } from './hooks';

const MAP_API_KEY = 'AIzaSyDUCSBvWKR3TXtogQD2YNsIUA66Jg_BC1k';

export default function Map() {
  const markers = useMarkers();

  return (
    <MapContainer center={[37.569442, 37.190833]} zoom={8} scrollWheelZoom={false} style={{ height: '100vh' }}>
      <ReactLeafletGoogleLayer apiKey={MAP_API_KEY} />

      {markers.map((marker, i) => (
        <Marker key={`marker-${i}`} position={[marker.lat, marker.lng]}>
          <Popup>
            {marker.name}
            <p>{marker.description}</p>
            <div>{marker.url && <a href={marker.url} target="_blank">{marker.url}</a>}</div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
