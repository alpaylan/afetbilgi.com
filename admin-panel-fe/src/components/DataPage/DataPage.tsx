import { Autocomplete, Box, Paper, TextField, Typography } from '@mui/material';
import { toast } from 'material-react-toastify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { dataFilters as dataFiltersAtom } from '../../atoms/Data';
import { TableDefinition } from '../../interfaces/Table';
import { getTableDefinitions } from '../../services/Table';
import { commonColors, commonStyles } from '../../util/Style';
import Appbar from '../Appbar/Appbar';
import Waiting from '../Waiting';

const DataPage = () => {
  const { t } = useTranslation();

  const [dataFilters, setDataFilters] = useRecoilState(dataFiltersAtom);

  const [loading, setLoading] = useState(false);
  const [tableDefinitions, setTableDefinitions] = useState<TableDefinition[]>(
    [],
  );

  useEffect(() => {
    setLoading(true);
    getTableDefinitions()
      .then((fetchedTableDefinitions) =>
        setTableDefinitions(fetchedTableDefinitions),
      )
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectTable = (_: any, selectedTableNames: string[]) => {
    setDataFilters({ ...dataFilters, selectedTableNames });
  };

  return (
    <Box component='div'>
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
            {t('data.data')}
          </Typography>
          <Typography
            sx={{ ...commonStyles.subtitle1, fontWeight: '400', fontSize: 14 }}
          >
            {t('data.page_description')}
          </Typography>
        </Box>
      </Paper>
      <Box component='div' sx={{ flexGrow: 1, px: 5, py: 2.5 }}>
        <Box
          component='div'
          sx={{ display: 'flex', flexDirection: 'row-wrap', flexGrow: 1 }}
        >
          <Autocomplete
            multiple
            disableCloseOnSelect
            limitTags={1}
            renderInput={(params) => (
              <TextField
                {...params}
                size='small'
                label='Table'
                variant='outlined'
                sx={{ width: 350, backgroundColor: commonColors.white }}
              />
            )}
            options={tableDefinitions.map(
              (tableDefinition) => tableDefinition.name,
            )}
            onChange={handleSelectTable}
            value={dataFilters.selectedTableNames}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DataPage;
