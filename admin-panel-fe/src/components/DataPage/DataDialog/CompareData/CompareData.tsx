import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Row } from '../../../../interfaces/Data';
import { TableDefinition } from '../../../../interfaces/TableDefinition';
import { commonColors } from '../../../../util/Style';
import DataSummaryCard from './DataSummaryCard';

interface CompareDataProps {
  currentState?: Row;
  newState?: Row;
  tableDefinition: TableDefinition;
}

const CompareData = (props: CompareDataProps) => {
  const { t } = useTranslation();

  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
    >
      <Grid container spacing={1.5}>
        {props.currentState && (
          <Grid item xs={6}>
            <DataSummaryCard
              title={t('data.dialog.existing_row')}
              color={commonColors.gray1}
              tableDefinition={props.tableDefinition}
              data={props.currentState}
            />
          </Grid>
        )}
        {props.newState && (
          <Grid item xs={6}>
            <DataSummaryCard
              title={t('data.dialog.new_row')}
              color={commonColors.blue1}
              tableDefinition={props.tableDefinition}
              data={props.newState}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CompareData;
