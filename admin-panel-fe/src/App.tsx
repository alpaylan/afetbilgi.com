import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import './App.css';
import { authToken as authTokenAtom } from './atoms/AuthToken';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login';
import { isValidToken } from './util/Auth';

const App = () => {
  const navigate = useNavigate();

  const authToken = useRecoilValue(authTokenAtom);

  useEffect(() => {
    if (!isValidToken(authToken)) {
      navigate('login');
    } else {
      navigate('');
    }
  }, [authToken]);

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='*' element={<Dashboard />} />
    </Routes>
  );
};

export default App;
