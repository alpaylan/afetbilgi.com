import React from 'react';

import './App.css';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Container, MenuItem, Select} from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import LocalStorage from './utils/LocalStorage';
import { Language } from './utils/types';
import { LANGUAGES } from './utils/util';
import Question from './components/Question';
import Waiting from './components/Waiting';
import { useQuestionData, useCitiesData, useLastBuildDate } from './hooks';
import cityTranslations from './utils/locales/il_translate.json'

import AboutUs from './components/AboutUs';
import SitesFab from './components/SitesFab';
import PDFDownloadDialog from './components/PDFDownloadDialog';
import CitySelection from './components/CitySelection';


function RootQuestion({ paths, selectedCity }: { paths : string[], selectedCity: string | null}) {
  

  return <Question paths={paths} selectedCity={selectedCity}/>;
}

const App = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isMinWidth = useMediaQuery('(min-width:1024px)');
  const [pdfDialogOpen, setPdfDialogOpen] = React.useState(false);

  const { isLoading } = useQuestionData([]);
  const {data: lastBuildDate} = useLastBuildDate();

  const {data: citiesRaw, isLoading : isCitiesLoading} = useCitiesData();
  const cities = citiesRaw as string[] | undefined;
  
  const citiesDict = Object.entries(cityTranslations).reduce((acc, [key, value]) => {
    acc[key] = Object.entries(value).reduce((acc2, [key2, value2]) => {
      // eslint-disable-next-line no-param-reassign
      acc2[key2] = value2;
      return acc2;
    }, {} as Record<string, string>);
    return acc;
  }, {} as Record<string, Record<string, string>>);


  const paths = location.pathname.split('/').filter((p) => p !== '');
  let finalPaths = paths;
  let selectedCity = null as string | null;
  const possibleCityName = decodeURIComponent(paths[0]);
  const isPathNameCity = paths.length > 0 && cities?.some( city => city === possibleCityName );
  if(isPathNameCity) {
    selectedCity = possibleCityName;
    finalPaths = [];
  }

  const changeCityHandler = (newValue : string | null) => {
    if(newValue) {
      navigate( `/${newValue}` );
    } else {
      navigate( `/` );
    }

  }


  const changeLanguageHandler = (selectedLanguage: Language) => {
    i18n.changeLanguage(selectedLanguage);
    LocalStorage.storeObject(
      LocalStorage.LOCAL_STORAGE_LANGUAGE,
      selectedLanguage,
    );
  };

  return (
    <Box>
      {isMinWidth && (
        <Box
          sx={{
            display: 'flex',
            background: 'rgba(220, 20, 60, 0.5)',
            padding: '10px',
            borderRadius: '10px',
            zIndex: 500,
            width: 'fit-content',
            position: 'absolute',
            ml: 2,
          }}
        >
          <SitesFab />
        </Box>
      )}

      <Waiting open={isLoading} />

      <Box
        sx={{
          mt: 3,
          mb: 2,
          display: 'flex',
          flexFlow: 'column nowrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {location.pathname !== '/' && (
            <Box sx={{ display: 'flex', flexFlow: "wrap", alignItems: "center", justifyContent: "center", mr: 1 }}>
              <Button size='large' onClick={() => navigate('/')}>
                {t('page.main.title')}
              </Button>

              <Button size='large' onClick={() => navigate(-1)}>
                {t('button.back')}
              </Button>
            </Box>
          )}

          <Button
            size='large'
            onClick={() => {
              window.open('https://maps.afetbilgi.com', '_blank');
            }}
            startIcon={<MapIcon />}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            {t('button.map')}
          </Button>

          {location.pathname !== '/about' && (
            <Button
              size='large'
              onClick={() => {
                setPdfDialogOpen(true);
              }}
              startIcon={<PictureAsPdfIcon />}
              variant="outlined"
              sx={{ mr: 1 }}
            >
              {t('button.download')}
            </Button>
          )}

        <Box sx={{ mr : 1}}>
          <Select
            id='language-options-multiselect'
            size='small'
            value={i18n.language}
            onChange={(e) => changeLanguageHandler(e.target.value as Language)}
          >
            {LANGUAGES.map(({ key, name }) => (
              <MenuItem key={key} value={key}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </Box>

 

        </Box>

        { (location.pathname === '/' || isPathNameCity) && !isCitiesLoading && 
        <Box sx={{ mt: 2, mr: 1 }}>
          <CitySelection changeCityHandler={changeCityHandler} cities={cities} citiesDict={citiesDict} selectedCity={selectedCity}/>
        </Box>
        }

      </Box>


      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path='/*' element={<RootQuestion paths={finalPaths} selectedCity={selectedCity}/>} />
          <Route path='/about' element={<AboutUs />} />
        </Routes>
      </Container>

      {location.pathname === '/' && (
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <Button onClick={() => navigate('/about')}>
            {t('page.about.title')}
          </Button>
        </Box>
      )}
      <Box sx={{ textAlign: 'center', p: 2 }}>
        {t('last_update')}: {lastBuildDate}
      </Box>
      <PDFDownloadDialog
        open={pdfDialogOpen}
        onClose={() => setPdfDialogOpen(false)}
      />
    </Box>
  );
};

export default App;
