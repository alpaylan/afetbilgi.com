import { Accordion, AccordionDetails, AccordionSummary, Box, CircularProgress, Divider, IconButton, InputBase, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { CheckCircleOutline, CircleOutlined, ExpandCircleDown, Search as SearchIcon } from '@mui/icons-material';
import React, { useEffect, useMemo, useState } from 'react';
import { CircleMarker, MapContainer, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import {SimpleMapScreenshoter} from 'leaflet-simple-map-screenshoter'
import { MarkerData, useMarkers } from './hooks';
import CustomMarker from './CustomMarker';
import { DataType, dataTypeToColor, dataTypeToLabel } from './utils/DataType';

import "./Map.css"
import { buildSearchIndex, filterMultipleTypes, searchText } from './utils/filters';

const INITIAL_ZOOM = 15;
const getZoom = (zoom: number) => Math.max(zoom ** 1.7 / 2, 32);

const BASE_LOCATION: [number, number] = [37.57713668904397, 36.92937651365644];

function Markers({ filteredData, selfLocation }: { filteredData: MarkerData["map_data"], selfLocation: [number, number] | null }){
  const [radius, setRadius] = useState(getZoom(useMap().getZoom()));
  const [bounds, setBounds] = useState(useMap().getBounds());

  const mapEvents = useMapEvents({
    zoomend: () => {
      setRadius(getZoom(mapEvents.getZoom()));
      setBounds(mapEvents.getBounds());
    },
    moveend: () => {
      setBounds(mapEvents.getBounds());
    }
  });

  const optimizedData = useMemo(() => {
    return filteredData.filter((item) => {
      const { latitude, longitude } = item;

      return latitude < bounds.getNorthEast().lat
        && latitude > bounds.getSouthWest().lat
        && longitude < bounds.getNorthEast().lng
        && longitude > bounds.getSouthWest().lng;
    });
  }, [filteredData, bounds]);

  return (
    <>
      {optimizedData.map((item, i) => (
        <CustomMarker
          key={`item-${i}`}
          item={item}
          radius={radius}
        />
      ))}

      {selfLocation &&
        <CircleMarker
          className="blink"
          center={selfLocation}
          weight={3}
          color="white"
          fillColor={"#00fb"}
          fillOpacity={1}
          radius={radius / 3}
          opacity={0.75}
        >
          <Popup>Sizin Konumunuz</Popup>
        </CircleMarker>
      }
    </>
  )
}

let isDownloadButtonAdded = false;
function MapDownloadButton() {
  const map = useMap();

  useEffect(() => {
    if (!isDownloadButtonAdded) {
      isDownloadButtonAdded = true;

      const ss = new SimpleMapScreenshoter();
      ss.addTo(map);
    }

  }, []);

  return (<></>);
}

export default function Map() {
  const [dataTypes, setDataTypes] = useState<string[]>(Object.values(DataType));
  const [selfLocation, setSelfLocation] = useState<[number, number] | null>(null);
  const [centerLocation, setCenterLocation] = useState<[number, number] | null>(null);

  const [searchString, setSearchString] = useState<string>('');

  const { data, isLoading } = useMarkers();

  const dataIndex = useMemo(() => buildSearchIndex(data?.map_data || []), [data]);
  const filteredData = useMemo(() => {
    if (!data) return [];

    const group1 = searchString ? searchText(dataIndex, searchString).map(i => i.item) : data.map_data;
    const group2 = filterMultipleTypes(group1, dataTypes);
    
    return group2;
  }, [data, dataIndex, searchString, dataTypes]);

  useEffect(() => {
    if (navigator.geolocation?.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setSelfLocation([position.coords.latitude, position.coords.longitude]);
          setCenterLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          setCenterLocation(BASE_LOCATION);
        });
    } else {
      setCenterLocation(BASE_LOCATION);
    }
  }, []);

  if (!data || isLoading || !centerLocation) {
    return (
      <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box id="map" sx={{ width: '100vw', height: '100vh' }}>
      <MapContainer center={centerLocation} zoom={INITIAL_ZOOM} maxZoom={18} minZoom={6} scrollWheelZoom={true} style={{ height: '100vh' }}>
        <TileLayer
          url={`https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&apistyle=s.e%3Al.i%7Cp.v%3Aoff%2Cs.t%3A3%7Cs.e%3Ag%7C`}
        />

        <Markers filteredData={filteredData} selfLocation={selfLocation} />

        <MapDownloadButton />
      </MapContainer>

      <Box sx={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: '10000',
      }}>
        <Box
          sx={{
            backgroundColor: 'white',
            border: 1,
            borderColor: 'rgba(0, 0, 0, 0.12)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: 200,
            height: 45,
            padding: '0px 10px',
          }}
        >
          <InputBase
            sx={{ p: 1 }}
            placeholder="Search"
            onChange={e => setSearchString(e.target.value)}
          />
          <Box sx={{ display: 'flex' }}>
            <Divider orientation="vertical" variant="middle" flexItem />
            <IconButton
              type="submit"
              sx={{ marginLeft: 1 }}
              aria-label="search"
              >
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{
          mt: 2,
        }}>
          <Accordion variant='outlined'>
            <AccordionSummary
              expandIcon={<ExpandCircleDown />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Filtreler</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack gap={1}>
                {Object.values(DataType)
                  .map((type) => (
                    <div
                      className='category-checkbox'
                      style={{
                        backgroundColor: dataTypes.includes(type) ? dataTypeToColor[type] : `${dataTypeToColor[type]}a`,
                      }}
                      key={`checkbox-${type}`}
                      onClick={() => {
                        setDataTypes(dataTypes.includes(type) ? dataTypes.filter((t) => t !== type) : [...dataTypes, type]);
                      }}
                      >
                        {dataTypes.includes(type)
                          ? <CheckCircleOutline style={{ color: 'white' }} />
                          : <CircleOutlined style={{ color: 'white' }} />}
                        <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                          {dataTypeToLabel[type].name_tr}
                        </Typography>
                    </div>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
}
