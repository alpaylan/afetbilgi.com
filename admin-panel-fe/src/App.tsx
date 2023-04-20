import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import './App.css';
import { authToken as authTokenAtom } from './atoms/AuthToken';
import Dashboard from './components/Dashboard/Dashboard';
import DataPage from './components/DataPage/DataPage';
import Login from './components/Login';
import PipelinePage from './components/Pipeline/PipelinePage';
import TablesPage from './components/TablesPage/TablesPage';
import { isValidToken, loadAuthToken } from './util/Auth';

const App = () => {
  const navigate = useNavigate();

  const [authToken, setAuthToken] = useRecoilState(authTokenAtom);

  useEffect(() => {
    setAuthToken(loadAuthToken());
  }, []);

  useEffect(() => {
    if (authToken === '' || (!!authToken && !isValidToken(authToken))) {
      navigate('/login');
    }
  }, [authToken]);

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='tables' element={<TablesPage />} />
      <Route path='pipeline' element={<PipelinePage />} />
      <Route path='data' element={<DataPage />} />
      <Route path='*' element={<Dashboard />} />
    </Routes>
  );
};

export default App;
