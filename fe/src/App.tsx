import React, { useEffect, useState } from 'react';
import preval from 'preval.macro';

import './App.css';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Container, Input, MenuItem, Select } from '@mui/material';
import { useTranslation } from 'react-i18next';

import LocalStorage from './utils/LocalStorage';
import { Language } from './utils/types';
import { LANGUAGES } from './utils/util';
import Question from './components/Question';
import Waiting from './components/Waiting';
import { useQuestionData } from './hooks';

function RootQuestion() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((p) => p !== '');

  return <Question paths={paths} />;
}

const App = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoading } = useQuestionData([]);

  const changeLanguageHandler = (selectedLanguage: Language) => {
    i18n.changeLanguage(selectedLanguage);
    LocalStorage.storeObject(
      LocalStorage.LOCAL_STORAGE_LANGUAGE,
      selectedLanguage,
    );
  };

  return (
    <Box>
      <Waiting open={isLoading} />

      <Box
        sx={{
          mt: 3,
          textAlign: 'center',
          display: 'flex',
          flexFlow: 'row nowrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {location.pathname !== '/' && location.pathname !== '/en' && (
          <>
            <Button
              sx={{ m: 1 }}
              size='large'
              onClick={() =>
                navigate(location.pathname.startsWith('/en') ? '/en' : '/')
              }
            >
              {t('page.main.title')}
            </Button>

            <Button sx={{ m: 1 }} size='large' onClick={() => navigate(-1)}>
              {t('button.back')}
            </Button>
          </>
        )}

        <Select
          id='language-options-multiselect'
          size='small'
          sx={{ m: 1 }}
          value={i18n.language}
          label='Language'
          onChange={(e) => changeLanguageHandler(e.target.value as Language)}
        >
          {LANGUAGES.map(({ key, name }) => (
            <MenuItem key={key} value={key}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Container sx={{ pt: '15vh' }}>
        <Routes>
          <Route path='/*' element={<RootQuestion />} />
        </Routes>
      </Container>

      <Box sx={{ textAlign: 'center', p: 2 }}>
        {t('last_update')}: {buildDateString}
      </Box>
    </Box>
  );
};

export default App;
