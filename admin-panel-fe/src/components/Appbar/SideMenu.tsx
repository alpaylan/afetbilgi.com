import ChecklistIcon from '@mui/icons-material/Checklist';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import TableChartIcon from '@mui/icons-material/TableChart';
import TranslateIcon from '@mui/icons-material/Translate';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface SideMenuProps {
  onClose: () => void;
}

const SideMenu = (props: SideMenuProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleNavigate = (to: string) => {
    if (navigate) {
      navigate(to);
    }
  };

  return (
    <Box sx={{ width: 250 }} role='presentation' onKeyDown={props.onClose}>
      <List>
        <ListItem key='home' disablePadding>
          <ListItemButton onClick={() => handleNavigate('/')}>
            <ListItemIcon>
              <HomeIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary={t('drawer.home')} />
          </ListItemButton>
        </ListItem>
        <ListItem key='data' disablePadding>
          <ListItemButton onClick={() => handleNavigate('/data')}>
            <ListItemIcon>
              <LibraryBooksIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary={t('drawer.data')} />
          </ListItemButton>
        </ListItem>
        <ListItem key='tables' disablePadding>
          <ListItemButton onClick={() => handleNavigate('/tables')}>
            <ListItemIcon>
              <TableChartIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary={t('drawer.tables')} />
          </ListItemButton>
        </ListItem>
        <ListItem key='tables' disablePadding>
          <ListItemButton onClick={() => handleNavigate('/locales')}>
            <ListItemIcon>
              <TranslateIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary={t('drawer.locales')} />
          </ListItemButton>
        </ListItem>
        <ListItem key='pipeline' disablePadding>
          <ListItemButton onClick={() => handleNavigate('/pipeline')}>
            <ListItemIcon>
              <ChecklistIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary={t('drawer.pipeline')} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default SideMenu;
