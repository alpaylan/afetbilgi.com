import { Box, Typography } from '@mui/material';
import { ColumnDefinition } from '../../../../interfaces/TableDefinition';
import { commonColors, commonStyles } from '../../../../util/Style';

interface StringFieldSummaryProps {
  columnDefinition: ColumnDefinition;
  value: string;
}

const StringFieldSummary = (props: StringFieldSummaryProps) => {
  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        marginBottom: 1.5,
      }}
    >
      <Typography
        sx={{
          ...commonStyles.overline,
          color: commonColors.gray4,
          textTransform: 'uppercase',
          marginBottom: 0.2,
        }}
      >
        {props.columnDefinition.name}
      </Typography>
      <Typography sx={{ ...commonStyles.body1 }}>
        {!props.columnDefinition.required && props.value === ''
          ? '-'
          : props.value}
      </Typography>
    </Box>
  );
};

export default StringFieldSummary;
