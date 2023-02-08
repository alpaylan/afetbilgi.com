import React, { useEffect, useState } from 'react';
import preval from 'preval.macro';

import './App.css';

import { Box, Button, Container, MenuItem, Select } from '@mui/material';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Waiting from './components/Waiting';
import Question from './components/Question';
import { useQuestionData } from './hooks';

function padNumber(num: number) {
  return num < 10 ? `0${num}` : num;
}

const buildTimestamp = preval`module.exports = new Date().getTime();`
const buildDate = new Date(buildTimestamp);
const buildDateString = `${padNumber(buildDate.getDay())}.${padNumber(buildDate.getMonth() + 1)}.${buildDate.getFullYear()} ${padNumber(buildDate.getHours())}:${padNumber(buildDate.getMinutes())}`;

function RootQuestion({ lang }: {lang: string}) {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((p) => p !== '');

  return <Question lang={lang} paths={paths} />;
}

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoading } = useQuestionData('', []);

  const [lang, setLang] = useState('');

  useEffect(() => {
    const savedLang = window.localStorage.getItem('lang');

    if (savedLang) {
      setLang(savedLang);
    } else {
      setLang('tr');
    }
  }, []);

  useEffect(() => {
    if (lang) {
      window.localStorage.setItem('lang', lang);
    }
  }, [lang]);

  if (!lang) {
    return (
      <Box>
        <Waiting open={isLoading} />
      </Box>
    );
  }

  return (
    <Box>
      <Waiting open={isLoading} />

        <Box sx={{ mt: 3, textAlign: 'center', display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center' }}>
          {location.pathname !== '/' && location.pathname !== '/en' && (
            <>
              <Button sx={{ m: 1 }} size="large" onClick={() => navigate(location.pathname.startsWith('/en') ? '/en': '/')}>
                {lang === 'en' ? 'MAIN PAGE' : 'ANA SAYFA'}
              </Button>

              <Button sx={{ m: 1 }} size="large" onClick={() => navigate(-1)}>
                {lang === 'en' ? 'BACK' : 'GERİ'}
              </Button>
            </>
          )}

          <Select
            value={lang}
            sx={{ m: 1 }}
            size="small"
            label="Language"
            onChange={(event) => {
              setLang(event.target.value);
            }}
          >
            <MenuItem value={'tr'}>Türkçe</MenuItem>
            <MenuItem value={'en'}>English</MenuItem>
            {/* <MenuItem value={'ku'}>Kurmancî</MenuItem> */}
          </Select>
        </Box>

      <Container sx={{ pt: '15vh' }}>
        <Routes>
          <Route path="/*" element={<RootQuestion lang={lang} />} />
        </Routes>
      </Container>

      <Box sx={{ textAlign: 'center', p: 2 }}>Son güncelleme: {buildDateString}</Box>
    </Box>
  );
};

export default App;
