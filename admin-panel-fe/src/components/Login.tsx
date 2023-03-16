import { Box, Button, Paper, TextField } from '@mui/material';
import { toast } from 'material-react-toastify';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authToken as authTokenAtom } from '../atoms/AuthToken';
import { login } from '../services/Auth';
import Waiting from './Waiting';

const Login = () => {
  const setAuthToken = useSetRecoilState(authTokenAtom);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangeUsername = (e: any) => {
    setUsername(e.target.value as string);
  };

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value as string);
  };

  const handleLogin = () => {
    setLoading(true);
    login(username, password)
      .then((authToken) => setAuthToken(authToken))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
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
            label='Username'
            value={username}
            sx={{ marginBottom: 1.5 }}
            onChange={handleChangeUsername}
          />
          <TextField
            size='small'
            label='Password'
            value={password}
            sx={{ marginBottom: 1.5 }}
            type='password'
            onChange={handleChangePassword}
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
