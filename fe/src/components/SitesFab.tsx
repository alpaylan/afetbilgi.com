import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';

import React from 'react';
import Title from './Title';

export default function SitesIcon() {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = React.useState<any>(null);
  const anchor = React.useRef(null);
  const handlePopoverOpen = (popoverOpen: string) => {
    const element = anchor;
    setAnchorEl(element.current);
    setIsOpen(popoverOpen);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setIsOpen(null);
  };
  const toBiggerIcon = {
    '&:hover': {
      transform: 'scale(1.5)',
    },
    '&': {
      transition: 'all 0.3s ease-in-out',
    },
  };

  const littleIcon = {
    width: 28,
    height: 28,
  };

  return (
    <Stack ref={anchor} id='sitesIcon' direction='row' spacing={2}>
      <Box sx={toBiggerIcon}>
        <Link
          href='https://depremyardim.com/'
          target='_blank'
          rel='noopener noreferrer'
          onMouseEnter={() => handlePopoverOpen('depremYardim')}
          onMouseLeave={handlePopoverClose}
        >
          <Avatar
            sx={littleIcon}
            alt='deprem yardim icon'
            src='/icons/depremYardımIcon.svg'
          />
        </Link>

        <Popover
          anchorReference='anchorEl'
          anchorEl={anchorEl}
          open={isOpen === 'depremYardim'}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            background: 'rgba(0, 0, 0, 0.1)',
            pointerEvents: 'none',
            zIndex: 600,
          }}
          onClose={handlePopoverClose}
        >
          <Box
            sx={{
              width: 450,
              padding: '10px',
            }}
          >
            <Title title={t('page.tooltip.depremyardim.title')} />
            <Typography>{t('page.tooltip.depremyardim.desc')}</Typography>
          </Box>
        </Popover>
      </Box>
      <Box sx={toBiggerIcon}>
        <Link
          href='https://afetharita.com/'
          target='_blank'
          rel='noopener noreferrer'
          onMouseEnter={() => handlePopoverOpen('afetBilgi')}
          onMouseLeave={handlePopoverClose}
          style={{
            textDecoration: 'none',
          }}
        >
          <Avatar
            sx={littleIcon}
            alt='deprem yardim icon'
            src='/icons/afetHaritaIcon.svg'
          />
        </Link>
        <Popover
          anchorReference='anchorEl'
          anchorEl={anchorEl}
          open={isOpen === 'afetBilgi'}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            background: 'rgba(0, 0, 0, 0.1)',
            pointerEvents: 'none',
            zIndex: 600,
          }}
          onClose={handlePopoverClose}
        >
          <Box
            sx={{
              width: 450,
              padding: '10px',
            }}
          >
            <Title title={t('page.tooltip.afetharita.title')} />
            <Typography>{t('page.tooltip.afetharita.desc')}</Typography>
          </Box>
        </Popover>
      </Box>

      <Box sx={toBiggerIcon}>
        <Link
          href='https://deprem.io/'
          target='_blank'
          rel='noopener noreferrer'
          onMouseEnter={() => handlePopoverOpen('depremIO')}
          onMouseLeave={handlePopoverClose}
        >
          <Avatar
            sx={littleIcon}
            alt='deprem io icon'
            src='/icons/depremIOIcon.svg'
          />
        </Link>

        <Popover
          anchorReference='anchorEl'
          anchorEl={anchorEl}
          open={isOpen === 'depremIO'}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            background: 'rgba(0, 0, 0, 0.1)',
            pointerEvents: 'none',
            zIndex: 600,
          }}
          onClose={handlePopoverClose}
        >
          <Box
            sx={{
              width: 450,
              padding: '10px',
            }}
          >
            <Title title={t('page.tooltip.depremio.title')} />
            <Typography>{t('page.tooltip.depremio.desc')}</Typography>
          </Box>
        </Popover>
      </Box>

      <Box sx={toBiggerIcon}>
        <Link
          href='https://discord.gg/itdepremyardim'
          target='_blank'
          onMouseEnter={() => handlePopoverOpen('depremDiscord')}
          rel='noopener noreferrer'
          onMouseLeave={handlePopoverClose}
        >
          <Avatar
            sx={littleIcon}
            alt='discord icon'
            src='/icons/discordIcon.svg'
          />
        </Link>

        <Popover
          anchorReference='anchorEl'
          anchorEl={anchorEl}
          open={isOpen === 'depremDiscord'}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{
            background: 'rgba(0, 0, 0, 0.1)',
            pointerEvents: 'none',
            zIndex: 600,
          }}
          onClose={handlePopoverClose}
        >
          <Box
            sx={{
              width: 450,
              padding: '10px',
            }}
          >
            <Title title={t('page.tooltip.discord.title')} />
            <Typography>{t('page.tooltip.discord.desc')}</Typography>
          </Box>
        </Popover>
      </Box>
    </Stack>
  );
}
