import { Box, Checkbox, CircularProgress, Divider, FormControlLabel, FormGroup, IconButton, InputBase } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';
import SearchIcon from '@mui/icons-material/Search';
import { useMarkers } from './hooks';
import { filterMultipleTypes, searchText } from './helpers/filters';

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

export const dataTypeToLabel: { [k: string]: any } =
  {
    [DataType.CITY_ACCOMMODATION]: { 'name_ar': 'ملاجئ مؤقتة', 'name_tr': 'Geçici Barınma Alanları', 'name_en': 'Temporary Accommodation Places', 'name_ku': 'Bicîhbûna Demkî' },
    [DataType.NEW_GATHERING_LIST]:{ 'name_ar': 'مناطق تجميع آمنة', 'name_tr': 'Güvenli Toplanma Alanları', 'name_en': 'Safe Gathering Places', 'name_ku': 'Qadên Ewle Bo Kombûnê' },
    [DataType.FOOD_ITEMS]:{ 'name_ar': 'مواقع توصيل الطعام', 'name_tr': 'Yemek Dağıtım Yerleri', 'name_en': 'Food Distribution Center', 'name_ku': 'Cihên Belavkirina Xwarinê' },
    [DataType.CONTAINER_PHARMACY]:{ 'name_ar': "صيدليات الحاويات", "name_ku": "Dermanxaneyên Seyare", "name_en": "Container Pharmacies", "name_tr": 'Konteyner Eczaneler' },
    [DataType.PHONE_NUMBER_LIST]:{ 'name_ar': 'أرقام هواتف مهمة', 'name_tr': 'Önemli Telefon Numaraları', 'name_en': 'Crucial Phone Number', 'name_ku': 'Numareyên Girîng' },
    [DataType.DATA_VET]: { 'name_ar': 'بَيَاطير', 'name_tr': 'Veterinerler', 'name_en': 'Veterinarians', 'name_ku': 'Veterîner' },
    [DataType.HELP_ITEM_LIST]:{ 'name_ar': 'فرص التبرع بالعناصر', 'name_tr': 'Yardım Toplama Merkezleri','name_en': 'Other Donation', 'name_ku': 'Bexşkirina Tiştan' },
    [DataType.STEM_CELL_DONATION]:{ 'name_ar': 'نقاط التبرع بالخلايا الجذعية', 'name_tr': 'Kök Hücre Bağış Noktaları', 'name_en': 'Stem Cell Donation Points', 'name_ku': 'Cihên bo bexşîna xaneyî bineretiyê' },
    [DataType.EVACUATION_POINTS]:{ 'name_ar': 'نقاط الإخلاء', 'name_tr': 'Tahliye Noktaları', 'name_en': 'Evacuation Points', 'name_ku': 'Xalên valakirinê' },
  };

const BASE_LOCATION: [number, number] = [37.57713668904397, 36.92937651365644];

export default function Map() {
  const { data, isLoading } = useMarkers();

  const [dataTypes, setDataTypes] = useState<string[]>(Object.values(DataType));
  const [selfLocation, setSelfLocation] = useState<[number, number] | null>(null);

  const [searchString, setSearchString] = useState<string>('');
  const filteredData = useMemo(() => {
    const group1 = searchText(data?.map_data ?? [], searchString);
    const group2 = filterMultipleTypes(group1, dataTypes);

    return group2;
  }, [data, searchString, dataTypes]);

  useEffect(() => {
    if (navigator.geolocation?.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setSelfLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          setSelfLocation(BASE_LOCATION);
        });
    } else {
      setSelfLocation(BASE_LOCATION);
    }
  }, []);

  if (!data || isLoading || !selfLocation) {
    return (
      <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <MapContainer center={[37.57713668904397, 36.92937651365644]} zoom={15} maxZoom={20} scrollWheelZoom={true} style={{ height: '100vh' }}>
        <TileLayer
        attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredData.map((item, i) => (
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
          <CircleMarker className="blink" center={selfLocation} weight={4} color="white" fillColor="blue" fillOpacity={1} radius={10}>
            <Popup>Sizin Konumunuz</Popup>
          </CircleMarker>
        </>}
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
            borderColor: 'border',
            borderStyle: 'groove',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 200,
            height: 45,
            padding: '0px 10px',
          }}
        >
          <InputBase
            sx={{ m: 1 }}
            placeholder="Search"
            onChange={e => setSearchString(e.target.value)}
          />
          <Divider orientation="vertical" variant="middle" flexItem />
          <IconButton
            type="submit"
            sx={{ marginLeft: 1 }}
            aria-label="search"
            onClick={() => {
            }}
          >
            <SearchIcon />
          </IconButton>
        </Box>

        <Box sx={{
          backgroundColor: 'white',
          mt: 2,
          p: 1,
        }}>
          <FormGroup>
            {Object.values(DataType)
              .map((type) => (
                <FormControlLabel
                  key={`checkbox-${type}`}
                  label={dataTypeToLabel[type].name_tr}
                  control={
                    <Checkbox onChange={(_, checked) => {
                      if (checked) {
                        setDataTypes([...dataTypes, type]);
                      } else {
                        setDataTypes(dataTypes.filter((t) => t !== type));
                      }
                    }}
                  sx={{ my: 0, py: 0 }} size="small" defaultChecked />
                  }
                />
              ))
            }
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
}
