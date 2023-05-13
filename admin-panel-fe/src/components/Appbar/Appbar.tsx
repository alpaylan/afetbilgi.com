import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popover,
  Typography,
} from '@mui/material';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authToken as authTokenAtom } from '../../atoms/AuthToken';
import { getUsername, storeAuthToken } from '../../util/Auth';
import { commonColors, commonStyles } from '../../util/Style';
import SideMenu from './SideMenu';

const Appbar = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const buttonRef = useRef();
  const containerRef = useRef();

  const setAuthToken = useSetRecoilState(authTokenAtom);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [showDrawer, setShowDrawer] = useState(false);

  const handleClickUserMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavigate = (to: string) => {
    if (navigate) {
      navigate(to);
    }
  };

  const handleLogout = () => {
    storeAuthToken('');
    setAuthToken('');
  };

  const getAvatarValue = () =>
    getUsername()
      .split(' ')
      .map((name) => name.slice(0, 1))
      .slice(0, 2)
      .join('');

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
        <Box
          component='div'
          ref={containerRef}
          sx={{ flexDirection: 'row', display: 'flex' }}
        >
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
          <Popover
            id={anchorEl ? 'popover' : undefined}
            open={!!anchorEl}
            anchorEl={anchorEl}
            container={containerRef.current}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Box
              component='div'
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <List>
                <ListItem key='profile' disablePadding>
                  <ListItemButton onClick={() => handleNavigate('/profile')}>
                    <ListItemIcon>
                      <AccountCircleIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={commonStyles.body1}>
                          {t('menu.profile')}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem key='logout' disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon color='primary' />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={commonStyles.body1}>
                          {t('menu.logout')}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Popover>
          <Box component='div' ref={buttonRef}>
            <Button
              onClick={handleClickUserMenu}
              sx={{ textTransform: 'none' }}
            >
              <Box
                component='div'
                sx={{ display: 'flex', flexDirection: 'row' }}
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    fontSize: 15,
                    p: 0.25,
                    mt: 'auto',
                    mb: 'auto',
                    mr: 1.5,
                    backgroundColor: commonColors.primary,
                  }}
                >
                  {getAvatarValue()}
                </Avatar>
                <Typography
                  sx={{
                    ...commonStyles.h6,
                    color: commonColors.black,
                    mt: 'auto',
                    mb: 'auto',
                  }}
                >
                  {getUsername()}
                </Typography>
              </Box>
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default Appbar;
