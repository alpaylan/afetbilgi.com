import { ChevronRight } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import { toast } from 'material-react-toastify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { localeConfig as localeConfigAtom } from '../../../atoms/Locale';
import { getLocaleConfig } from '../../../services/Locale';
import { commonStyles } from '../../../util/Style';
import LocaleWithFlag from '../../Locale/LocaleWithFlag';

const SupportedLocalesWidget = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [localeConfig, setLocaleConfig] = useRecoilState(localeConfigAtom);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getLocaleConfig()
      .then((config) => setLocaleConfig(config))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleNavigate = (to: string) => {
    if (navigate) {
      navigate(to);
    }
  };

  return (
    <Paper sx={{ flexGrow: 1, padding: 2, height: '95%' }}>
      <Box component='div' sx={commonStyles.row}>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          {t('supported_locales.supported_locales')}
        </Typography>
        <Box component='div' flexGrow={1} />
        <Button
          color='primary'
          size='small'
          onClick={() => handleNavigate('/locales')}
          endIcon={<ChevronRight />}
          sx={commonStyles.buttonText}
        >
          {t('view_more')}
        </Button>
      </Box>
      <Divider sx={{ mb: 1.5 }} />
      {loading ? (
        <>
          <Skeleton variant='text' sx={{ fontSize: '32px' }} />
          <Skeleton variant='circular' width={40} height={40} />
          <Skeleton variant='rectangular' width={210} height={60} />
          <Skeleton variant='rounded' width={210} height={60} />
        </>
      ) : (
        <Box
          component='div'
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            flexGrow: 1,
            justifyContent: 'center',
          }}
        >
          {localeConfig.supportedLocales.map((locale) => (
            <LocaleWithFlag
              locale={locale}
              isDefault={locale === localeConfig.defaultLocale}
            />
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default SupportedLocalesWidget;
