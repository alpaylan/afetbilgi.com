import AddIcon from '@mui/icons-material/Add';
import {
  Autocomplete,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { toast } from 'material-react-toastify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { localeConfig as localeConfigAtom } from '../../atoms/Locale';
import { allLocales } from '../../constants/Locale';
import { Action } from '../../interfaces/Action';
import {
  addSupportedLocale,
  deleteSupportedLocale,
  getLocaleConfig,
} from '../../services/Locale';
import { isAllowed } from '../../util/Action';
import { commonColors, commonStyles } from '../../util/Style';
import Appbar from '../Appbar/Appbar';
import ConfirmDialog from '../ConfirmDialog';
import Waiting from '../Waiting';
import LocaleWithFlag from './LocaleWithFlag';

const LocalesPage = () => {
  const { t } = useTranslation();

  const [localeConfig, setLocaleConfig] = useRecoilState(localeConfigAtom);

  const [loadingLocaleConfig, setLoadingLocaleConfig] = useState(false);
  const [updatingLocaleConfig, setUpdatingLocaleConfig] = useState(false);
  const [localeToAdd, setLocaleToAdd] = useState<string | undefined>(undefined);
  const [localeToDelete, setLocaleToDelete] = useState<string | undefined>(
    undefined,
  );
  const [showConfirmAddLocaleDialog, setShowConfirmAddLocaleDialog] =
    useState(false);

  const refreshLocaleConfig = () => {
    setLoadingLocaleConfig(true);
    getLocaleConfig()
      .then((config) => setLocaleConfig(config))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoadingLocaleConfig(false));
  };

  useEffect(refreshLocaleConfig, []);

  useEffect(() => {
    if (!localeToAdd) {
      setShowConfirmAddLocaleDialog(false);
    }
  }, [localeToAdd]);

  const handleAddLocale = () => {
    if (!localeToAdd) {
      return;
    }

    const locale = localeToAdd;
    setLocaleToAdd(undefined);
    setUpdatingLocaleConfig(true);
    addSupportedLocale(locale)
      .then(refreshLocaleConfig)
      .catch((err) => toast.error(err.message))
      .finally(() => setUpdatingLocaleConfig(false));
  };

  const handleDeleteLocale = () => {
    if (!localeToDelete) {
      return;
    }

    const locale = localeToDelete;
    setLocaleToDelete(undefined);
    setUpdatingLocaleConfig(true);
    deleteSupportedLocale(locale)
      .then(refreshLocaleConfig)
      .catch((err) => toast.error(err.message))
      .finally(() => setUpdatingLocaleConfig(false));
  };

  const handleSelectLocaleToAdd = (
    _: any,
    newSelectedLocale: string | null,
  ) => {
    setLocaleToAdd(newSelectedLocale ?? undefined);
  };

  const loading = loadingLocaleConfig || updatingLocaleConfig;

  return (
    <Box component='div'>
      {localeToDelete && (
        <ConfirmDialog
          title={t('locales.are_you_sure')}
          content={t('locales.confirm_delete', {
            locale: t(`locale.${localeToDelete}`),
          })}
          okText={t('confirm')}
          cancelText={t('cancel')}
          open
          onClose={() => setLocaleToDelete(undefined)}
          onConfirm={handleDeleteLocale}
          color='error'
        />
      )}
      {showConfirmAddLocaleDialog && localeToAdd && (
        <ConfirmDialog
          title={t('locales.are_you_sure')}
          content={t('locales.confirm_add', {
            locale: t(`locale.${localeToAdd}`),
          })}
          okText={t('confirm')}
          cancelText={t('cancel')}
          open
          onClose={() => setLocaleToAdd(undefined)}
          onConfirm={handleAddLocale}
          color='primary'
        />
      )}
      <Appbar />
      <Waiting open={loading} />
      <Paper
        sx={{
          backgroundColor: commonColors.gray1,
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          paddingX: 6,
          paddingY: 3.5,
          mt: 0.1,
        }}
      >
        <Box
          component='div'
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography sx={{ ...commonStyles.h3, pb: 1.5 }}>
            {t('locales.supported_locales')}
          </Typography>
          <Typography
            sx={{ ...commonStyles.subtitle1, fontWeight: '400', fontSize: 14 }}
          >
            {t('locales.page_description')}
          </Typography>
        </Box>
        <Box component='div' sx={{ flexGrow: 1 }} />
        <Autocomplete
          renderInput={(params) => (
            <TextField
              {...params}
              size='small'
              label={t('locales.new_locale')}
              variant='outlined'
              sx={{
                width: 350,
                backgroundColor: commonColors.white,
              }}
            />
          )}
          options={allLocales.filter(
            (locale) => !localeConfig.supportedLocales.includes(locale),
          )}
          getOptionLabel={(option) => t(`locale.${option}`)}
          value={localeToAdd ?? null}
          disabled={!isAllowed(Action.EDIT_LOCALES)}
          onChange={handleSelectLocaleToAdd}
          sx={{ mb: 'auto', mt: 'auto' }}
        />
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon />}
          size='small'
          disabled={!localeToAdd || !isAllowed(Action.EDIT_LOCALES)}
          onClick={() => setShowConfirmAddLocaleDialog(true)}
          sx={{ ...commonStyles.buttonText, mt: 'auto', mb: 'auto', ml: 1.5 }}
        >
          {t('locales.add_locale')}
        </Button>
      </Paper>
      <Box
        component='div'
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          px: 5,
          py: 2.5,
        }}
      >
        {localeConfig.supportedLocales.map((locale) => (
          <LocaleWithFlag
            locale={locale}
            isDefault={locale === localeConfig.defaultLocale}
            onDelete={
              isAllowed(Action.EDIT_LOCALES)
                ? () => setLocaleToDelete(locale)
                : undefined
            }
          />
        ))}
      </Box>
    </Box>
  );
};

export default LocalesPage;
