import React, { useEffect, useState } from 'react';

import './App.css';

import { Box, Button, Container } from '@mui/material';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Waiting from './components/Waiting';
import Question from './components/Question';
import { useQuestionData } from './hooks';

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

          <Button sx={{ m: 1 }} size="large" onClick={() => setLang(lang === 'en' ? 'tr' : 'en')}>
            {lang === 'en' ? 'CHANGE LANGUAGE' : 'DİLİ DEĞİŞTİR'}
          </Button>
        </Box>

      <Container sx={{ pt: '15vh' }}>
        <Routes>
          <Route path="/*" element={<RootQuestion lang={lang} />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
