import AssignmentIcon from '@mui/icons-material/Assignment';
import ChecklistIcon from '@mui/icons-material/Checklist';
import HomeIcon from '@mui/icons-material/Home';
import TableChartIcon from '@mui/icons-material/TableChart';
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
        <ListItem key='assignments' disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AssignmentIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary={t('drawer.assignments')} />
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
