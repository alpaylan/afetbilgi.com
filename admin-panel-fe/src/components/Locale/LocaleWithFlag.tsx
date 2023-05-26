import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import getUnicodeFlagIcon from 'country-flag-icons/unicode';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getCountryNameFromLocale } from '../../util/Locale';
import { commonColors, commonStyles } from '../../util/Style';

interface LocaleWithFlagProps {
  locale: string;
  isDefault: boolean;
  onDelete?: () => void;
}

const LocaleWithFlag = (props: LocaleWithFlagProps) => {
  const { t } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);

  const countryName = getCountryNameFromLocale(props.locale);

  return (
    <Box component='div' sx={{ width: 200, mb: 1.5, mr: 1.5 }}>
      <Paper
        onMouseEnter={
          props.onDelete && !props.isDefault
            ? () => setIsHovered(true)
            : undefined
        }
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          p: 0,
          pb: 1.5,
          textAlign: 'center',
          backgroundColor: commonColors.gray1,
          height: '92%',
        }}
      >
        {isHovered ? (
          <IconButton
            onClick={props.onDelete}
            sx={{ color: commonColors.statusRed, mt: 1.8, mb: 1.8 }}
          >
            <DeleteIcon fontSize='large' />
          </IconButton>
        ) : (
          <Typography sx={{ fontSize: 54 }}>
            {countryName ? getUnicodeFlagIcon(countryName.toUpperCase()) : '🏳️'}
          </Typography>
        )}
        <Typography sx={{ ...commonStyles.body1, fontWeight: 'bold' }}>
          {t(`locale.${props.locale}`)}
        </Typography>
        {props.isDefault && (
          <Typography
            sx={{
              ...commonStyles.body2,
              color: commonColors.gray5,
              mt: 0.25,
              mb: -1,
            }}
          >
            {t('locales.default')}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default LocaleWithFlag;
