import * as React from 'react';

import './App.css';

import { Box, Button, Container } from '@mui/material';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Waiting from './components/Waiting';
import Question from './components/Question';
import { useQuestionData } from './hooks';

function RootQuestion() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((p) => p !== '');

  return <Question paths={paths} />;
}

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading } = useQuestionData([]);

  return (
    <Box>
      <Waiting open={isLoading} />

      {location.pathname !== '/' ? (
        <Box sx={{ mt: 3, textAlign: 'center', display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center' }}>
          <Button sx={{ m: 1 }} size="large" onClick={() => navigate('/')}>
            Ana Sayfa
          </Button>

          <Button sx={{ m: 1 }} size="large" onClick={() => navigate(-1)}>
            Geri
          </Button>
        </Box>
      ) : <Box sx={{ pt: '60px' }} />}

      <Container sx={{ pt: '15vh' }}>
        <Routes>
          <Route path="/*" element={<RootQuestion />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
