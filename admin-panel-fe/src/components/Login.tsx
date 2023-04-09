import { Box, Button, Paper, TextField } from '@mui/material';
import { toast } from 'material-react-toastify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authToken as authTokenAtom } from '../atoms/AuthToken';
import { login } from '../services/Auth';
import { isValidToken, storeAuthToken } from '../util/Auth';
import Waiting from './Waiting';

const Login = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [authToken, setAuthToken] = useRecoilState(authTokenAtom);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authToken && isValidToken(authToken)) {
      navigate('/');
    }
  }, [authToken]);

  const handleChangeUsername = (e: any) => {
    setUsername(e.target.value as string);
  };

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value as string);
  };

  const handleLogin = () => {
    setLoading(true);
    login(username, password)
      .then((token) => {
        storeAuthToken(token);
        setAuthToken(token);
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  const handleTextFieldKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      handleLogin();
    }
  };

  return (
    <Box
      component='div'
      display='flex'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
    >
      <Waiting open={loading} />
      <Paper sx={{ padding: 2 }}>
        <Box component='div' display='flex' flexDirection='column'>
          <TextField
            size='small'
            label={t('username')}
            value={username}
            sx={{ marginBottom: 1.5 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChangeUsername}
            onKeyDown={handleTextFieldKeyDown}
          />
          <TextField
            size='small'
            label={t('password')}
            value={password}
            sx={{ marginBottom: 1.5 }}
            type='password'
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChangePassword}
            onKeyDown={handleTextFieldKeyDown}
          />
          <Box component='div' display='flex' flexDirection='row' flexGrow={1}>
            <Box component='div' flexGrow={1} />
            <Button
              color='primary'
              size='small'
              onClick={handleLogin}
              sx={{ textTransform: 'none' }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
