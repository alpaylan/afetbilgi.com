import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authToken as authTokenAtom } from '../../atoms/AuthToken';
import { storeAuthToken } from '../../util/Auth';
import { commonStyles } from '../../util/Style';
import SideMenu from './SideMenu';

const Appbar = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const setAuthToken = useSetRecoilState(authTokenAtom);

  const [showDrawer, setShowDrawer] = useState(false);

  const handleNavigate = (to: string) => {
    if (navigate) {
      navigate(to);
    }
  };

  const handleLogout = () => {
    storeAuthToken('');
    setAuthToken('');
  };

  return (
    <>
      <Drawer
        anchor='left'
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        <SideMenu onClose={() => setShowDrawer(false)} />
      </Drawer>
      <Paper sx={{ flexGrow: 1, padding: 1 }}>
        <Box component='div' sx={{ flexDirection: 'row', display: 'flex' }}>
          <IconButton onClick={() => setShowDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={() => handleNavigate('/')}
            sx={{
              ...commonStyles.subtitle1,
              ml: 1.5,
              mt: 'auto',
              mb: 'auto',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {t('title')}
          </Typography>
          <Box component='div' flexGrow={1} />
          <Button
            onClick={handleLogout}
            endIcon={<LogoutIcon />}
            sx={{ textTransform: 'none' }}
          >
            {t('logout')}
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default Appbar;
