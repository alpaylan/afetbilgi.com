import { ChevronRight } from '@mui/icons-material';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { Box, Button, Card, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TableDefinition } from '../../interfaces/TableDefinition';
import { formatLocalTime } from '../../util/DateTime';
import { commonColors, commonStyles } from '../../util/Style';

interface TableInfoFieldProps {
  title: string;
  value: string;
}

const TableInfoField = (props: TableInfoFieldProps) => {
  return (
    <Box component='div' sx={{ mt: 0.75, mb: 0.25 }}>
      <Typography
        sx={{
          ...commonStyles.subtitle2,
          color: commonColors.gray5,
          textTransform: 'uppercase',
        }}
      >
        {props.title}
      </Typography>
      <Typography
        sx={{
          ...commonStyles.subtitle1,
        }}
      >
        {props.value}
      </Typography>
    </Box>
  );
};

interface TableCardProps {
  tableDefinition: TableDefinition;
  onEdit: () => void;
}

const TableCard = (props: TableCardProps) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ height: '100%' }}>
      <Box component='div' sx={{ m: 1 }}>
        <Box
          component='div'
          sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}
        >
          <BackupTableIcon
            color='primary'
            sx={{ mt: 'auto', mb: 'auto', mr: 1 }}
          />
          <Typography variant='h5'>{props.tableDefinition.name}</Typography>
          <Box component='div' flexGrow={1} />
          <Button
            onClick={props.onEdit}
            color='primary'
            size='small'
            endIcon={<ChevronRight />}
            sx={commonStyles.buttonText}
          >
            {t('edit')}
          </Button>
        </Box>
        <TableInfoField
          title={t('table.columns')}
          value={props.tableDefinition.columns.length.toString()}
        />
        <TableInfoField
          title={t('table.last_updated_at')}
          value={formatLocalTime(props.tableDefinition.lastUpdatedAt)}
        />
        <TableInfoField
          title={t('table.last_updated_by')}
          value={props.tableDefinition.lastUpdatedBy}
        />
      </Box>
    </Card>
  );
};

export default TableCard;
