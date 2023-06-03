import { Box, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  OutputIconProps,
  OutputKind,
} from '../../../../../interfaces/Output/Output';
import { getOutputIcon } from '../../../../../util/Output/Output';
import { commonColors, commonStyles } from '../../../../../util/Style';

interface OutputOptionProps {
  kind: OutputKind;
  disabled?: boolean;
  selected: boolean;
  onSelect?: () => void;
}

const OutputOption = (props: OutputOptionProps) => {
  const { t } = useTranslation();

  const getIcon = () => {
    const iconProps: OutputIconProps = {
      fontSize: 'large',
      sx: {
        color: props.disabled ? commonColors.gray4 : commonColors.primary,
      },
    };

    return getOutputIcon(props.kind, iconProps);
  };

  return (
    <Box component='div' sx={{ width: 200, mb: 3, mr: 1.5 }}>
      <Paper
        onClick={props.onSelect ? props.onSelect : undefined}
        sx={{
          p: 0,
          pb: 1,
          pt: 1.5,
          textAlign: 'center',
          backgroundColor: commonColors.gray1,
          height: '92%',
          border: props.selected ? 1.7 : undefined,
          borderColor: props.selected ? commonColors.blue5 : undefined,
          cursor: props.disabled ? 'default' : 'pointer',
        }}
      >
        {getIcon()}
        <Typography
          sx={{
            ...commonStyles.body1,
            fontWeight: 'bold',
            color: props.disabled ? commonColors.gray5 : commonColors.black,
          }}
        >
          {t(`output.kind.${props.kind}`)}
        </Typography>

        {props.disabled && (
          <Typography
            sx={{
              ...commonStyles.body2,
              color: commonColors.gray5,
              mt: 0.25,
              mb: -1,
            }}
          >
            {t('output.kind.coming_soon')}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default OutputOption;
