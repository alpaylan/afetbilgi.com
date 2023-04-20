import { ChevronRight } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { toast } from 'material-react-toastify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { TableDefinition } from '../../../interfaces/Table';
import { getTableDefinitions } from '../../../services/Table';
import { formatLocalTime } from '../../../util/DateTime';
import { commonColors, commonStyles } from '../../../util/Style';

const TableDefinitionsWidget = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [tableDefinitions, setTableDefinitions] = useState<TableDefinition[]>(
    [],
  );

  useEffect(() => {
    setLoading(true);
    getTableDefinitions()
      .then((fetchedTableDefinitions) =>
        setTableDefinitions(fetchedTableDefinitions.slice(0, 5)),
      )
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleNavigate = (to: string) => {
    if (navigate) {
      navigate(to);
    }
  };

  const fieldNameStyle = {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
  };

  return (
    <Paper sx={{ flexGrow: 1, padding: 2, height: '95%' }}>
      <Box component='div' sx={commonStyles.row}>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          {t('table.table_definitions')}
        </Typography>
        <Box component='div' flexGrow={1} />
        <Button
          color='primary'
          size='small'
          onClick={() => handleNavigate('/tables')}
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
        <TableContainer
          sx={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            backgroundColor: commonColors.gray1,
          }}
        >
          <Table size='small'>
            <TableHead sx={{ backgroundColor: commonColors.gray2 }}>
              <TableRow>
                <TableCell key='name'>
                  <Typography sx={fieldNameStyle}>{t('table.name')}</Typography>
                </TableCell>
                <TableCell key='columns'>
                  <Typography sx={fieldNameStyle}>
                    {t('table.columns')}
                  </Typography>
                </TableCell>
                <TableCell key='last-updated-at'>
                  <Typography sx={fieldNameStyle}>
                    {t('table.last_updated_at')}
                  </Typography>
                </TableCell>
                <TableCell key='last-updated-by'>
                  <Typography sx={fieldNameStyle}>
                    {t('table.last_updated_by')}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableDefinitions.map((tableDefinition) => (
                <TableRow key={tableDefinition.name}>
                  <TableCell key={`${tableDefinition.name}_name`}>
                    <Typography>{tableDefinition.name}</Typography>
                  </TableCell>
                  <TableCell key={`${tableDefinition.name}_columns`}>
                    <Typography>{tableDefinition.columns.length}</Typography>
                  </TableCell>
                  <TableCell key={`${tableDefinition.name}_last_updated_at`}>
                    <Typography>
                      {formatLocalTime(tableDefinition.lastUpdatedAt)}
                    </Typography>
                  </TableCell>
                  <TableCell key={`${tableDefinition.name}_last_updated_by`}>
                    <Typography>{tableDefinition.lastUpdatedBy}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default TableDefinitionsWidget;
