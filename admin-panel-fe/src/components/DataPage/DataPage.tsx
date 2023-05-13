import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { isEmpty } from 'lodash';
import { toast } from 'material-react-toastify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dataFilters as dataFiltersAtom } from '../../atoms/Data';
import { pipelineStages as pipelineStagesAtom } from '../../atoms/Pipeline';
import { users as usersAtom } from '../../atoms/User';
import { TableData } from '../../interfaces/Data';
import { TableDefinition } from '../../interfaces/TableDefinition';
import { getData } from '../../services/Data';
import { getPipelineStages } from '../../services/Pipeline';
import { getTableDefinitions } from '../../services/Table';
import { getUsers } from '../../services/User';
import { commonColors, commonStyles } from '../../util/Style';
import Appbar from '../Appbar/Appbar';
import Waiting from '../Waiting';
import DataTable from './DataTable/DataTable';

const DataPage = () => {
  const { t } = useTranslation();

  const [dataFilters, setDataFilters] = useRecoilState(dataFiltersAtom);
  const [pipelineStages, setPipelineStages] =
    useRecoilState(pipelineStagesAtom);
  const setUsers = useSetRecoilState(usersAtom);

  const [loadingTableDefinitions, setLoadingTableDefinitions] = useState(false);
  const [loadingPipelineStages, setLoadingPipelineStages] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingDataList, setLoadingDataList] = useState(false);
  const [tableDefinitions, setTableDefinitions] = useState<TableDefinition[]>(
    [],
  );
  const [tableDataList, setTableDataList] = useState<TableData[]>([]);

  const refreshDataList = () => {
    if (!isEmpty(dataFilters.selectedTableNames)) {
      setLoadingDataList(true);
      getData(dataFilters)
        .then((fetchedData) => setTableDataList(fetchedData))
        .catch((err) => toast.error(err.message))
        .finally(() => setLoadingDataList(false));
    } else {
      setTableDataList([]);
    }
  };

  useEffect(() => {
    setLoadingTableDefinitions(true);
    getTableDefinitions()
      .then((fetchedTableDefinitions) =>
        setTableDefinitions(fetchedTableDefinitions),
      )
      .catch((err) => toast.error(err.message))
      .finally(() => setLoadingTableDefinitions(false));

    setLoadingPipelineStages(true);
    getPipelineStages()
      .then((fetchedPipelineStages) => setPipelineStages(fetchedPipelineStages))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoadingPipelineStages(false));

    setLoadingUsers(true);
    getUsers()
      .then((users) => setUsers(users))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoadingUsers(false));
  }, []);

  useEffect(refreshDataList, [dataFilters]);

  const handleSelectTable = (_: any, selectedTableNames: string[]) => {
    setDataFilters({ ...dataFilters, selectedTableNames });
  };

  const handleSelectStage = (e: any) => {
    setDataFilters({ ...dataFilters, selectedStages: e.target.value ?? [] });
  };

  const handleToggleOnlyAssignedToMe = () => {
    setDataFilters({
      ...dataFilters,
      onlyAssignedToMe: !dataFilters.onlyAssignedToMe,
    });
  };

  const loading =
    loadingDataList ||
    loadingPipelineStages ||
    loadingTableDefinitions ||
    loadingUsers;

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
          <FormControl
            size='small'
            sx={{ ml: 1.5, minWidth: 200, mt: 'auto', mb: 'auto' }}
          >
            <InputLabel id='stage-select-label'>{t('data.stage')}</InputLabel>
            <Select
              labelId='stage-select-label'
              label={t('data.stage')}
              id='stage-select'
              onChange={handleSelectStage}
              value={dataFilters.selectedStages}
              multiple
              sx={{ backgroundColor: commonColors.white }}
            >
              {pipelineStages.map((pipelineStage) => (
                <MenuItem value={pipelineStage.id}>
                  {pipelineStage.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={dataFilters.onlyAssignedToMe}
                onChange={handleToggleOnlyAssignedToMe}
              />
            }
            label={
              <Typography sx={commonStyles.subtitle1}>
                {t('data.only_assigned_to_me')}
              </Typography>
            }
            sx={{ ml: 1.5, mt: 'auto', mb: 'auto' }}
          />
        </Box>
        {tableDataList.map((tableData) => (
          <DataTable tableData={tableData} onUpdate={refreshDataList} />
        ))}
      </Box>
    </Box>
  );
};

export default DataPage;
