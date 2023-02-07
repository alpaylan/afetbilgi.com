import * as React from 'react';

import './App.css';

import { Box, Container } from '@mui/material';

import { Route, Routes, useLocation } from 'react-router-dom';
import Waiting from './components/Waiting';
import Question from './components/Question';
import { useQuestionData } from './hooks';

function RootQuestion() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((p) => p !== '');

  return <Question paths={paths} />;
}

const App = () => {
  const { isLoading } = useQuestionData();

  return (
    <Box sx={{ height: '100%' }}>
      <Waiting open={isLoading} />

      <Container sx={{ height: '100%' }}>
        <Routes>
          <Route path="/*" element={<RootQuestion />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
