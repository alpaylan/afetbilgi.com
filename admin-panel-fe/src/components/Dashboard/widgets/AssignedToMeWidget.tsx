import { ChevronRight } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { uniq } from 'lodash';
import { toast } from 'material-react-toastify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { dataFilters as dataFiltersAtom } from '../../../atoms/Data';
import { pipelineStages as pipelineStagesAtom } from '../../../atoms/Pipeline';
import { Assignment } from '../../../interfaces/Assignment';
import { getAssignments } from '../../../services/Assignment';
import { commonColors, commonStyles } from '../../../util/Style';

const AssignedToMeWidget = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const pipelineStages = useRecoilValue(pipelineStagesAtom);
  const setDataFilters = useSetRecoilState(dataFiltersAtom);

  const [loading, setLoading] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [rowsToAssign, setRowsToAssign] = useState(10);
  const [stageToAssign, setStageToAssign] = useState('');

  useEffect(() => {
    setLoading(true);
    getAssignments()
      .then((fetchedAssignments) =>
        setAssignments(fetchedAssignments.slice(0, 5)),
      )
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setStageToAssign(pipelineStages[0]?.id ?? '');
  }, [pipelineStages]);

  const handleNavigate = (to: string) => {
    if (navigate) {
      navigate(to);
    }
  };

  const handleViewAllAssigned = () => {
    setDataFilters({
      selectedTableNames: uniq(
        assignments.map((assignment) => assignment.tableName),
      ),
      selectedStages: [],
      onlyAssignedToMe: true,
    });

    handleNavigate('/data');
  };

  const handleViewAssignment = (tableName: string, stage: string) => {
    setDataFilters({
      selectedTableNames: [tableName],
      selectedStages: [stage],
      onlyAssignedToMe: true,
    });

    handleNavigate('/data');
  };

  const handleChangeRowsToAssign = (e: any) => {
    setRowsToAssign(Math.max(0, parseInt(e.target.value as string, 10) ?? 0));
  };

  const handleChangeStageToAssign = (e: any) => {
    setStageToAssign(e.target.value);
  };

  const getPipelineStageName = (stageID: string): string =>
    pipelineStages.find((stage) => stage.id === stageID)?.name ?? stageID;

  const fieldNameStyle = {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
  };

  return (
    <Paper sx={{ flexGrow: 1, padding: 2, mb: 1, height: '95%' }}>
      <Box component='div' sx={commonStyles.row}>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          {t('dashboard.assigned_to_me')}
        </Typography>
        <Box component='div' flexGrow={1} />
        <Button
          color='primary'
          size='small'
          endIcon={<ChevronRight />}
          onClick={handleViewAllAssigned}
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
          sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
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
                  <TableCell key='stage'>
                    <Typography sx={fieldNameStyle}>
                      {t('assignment.stage')}
                    </Typography>
                  </TableCell>
                  <TableCell key='table'>
                    <Typography sx={fieldNameStyle}>
                      {t('assignment.table_name')}
                    </Typography>
                  </TableCell>
                  <TableCell key='rows'>
                    <Typography sx={fieldNameStyle}>
                      {t('assignment.row_count')}
                    </Typography>
                  </TableCell>
                  <TableCell align='center' key='action'>
                    <Typography sx={fieldNameStyle}>
                      {t('assignment.action')}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {assignments.map((assignment, i) => (
                  <TableRow key={i}>
                    <TableCell key={`${i.toString()}_stage`}>
                      <Typography>
                        {getPipelineStageName(assignment.stageID)}
                      </Typography>
                    </TableCell>
                    <TableCell key={`${i.toString()}_table`}>
                      <Typography>{assignment.tableName}</Typography>
                    </TableCell>
                    <TableCell key={`${i.toString()}_rows`}>
                      <Typography>{assignment.rowCount}</Typography>
                    </TableCell>
                    <TableCell align='center' key={`${i.toString()}_action`}>
                      <Button
                        color='primary'
                        size='small'
                        onClick={() =>
                          handleViewAssignment(
                            assignment.tableName,
                            assignment.stageID,
                          )
                        }
                        sx={{ ...commonStyles.buttonText, p: 0 }}
                      >
                        {t('assignment.view')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ mt: 2 }} />
          <Box
            component='div'
            sx={{
              display: 'flex',
              flexDirection: 'row-wrap',
              flexGrow: 1,
              justifyContent: 'center',
              mt: 1,
            }}
          >
            <Typography>{t('assignment.assign')}</Typography>
            <TextField
              variant='standard'
              size='small'
              type='number'
              value={rowsToAssign}
              onChange={handleChangeRowsToAssign}
              sx={{ ml: 0.5, mr: 0.5, width: 70 }}
            />
            <Typography>{t('assignment.rows_in_stage')}</Typography>
            <Select
              variant='standard'
              size='small'
              value={stageToAssign}
              onChange={handleChangeStageToAssign}
              sx={{ ml: 1 }}
            >
              {pipelineStages.map((stage) => (
                <MenuItem id={stage.id} value={stage.id} key={stage.id}>
                  {stage.name}
                </MenuItem>
              ))}
            </Select>
            <IconButton
              size='small'
              color='primary'
              sx={{ mt: -0.5, ml: 2, p: 0 }}
            >
              <SendIcon fontSize='small' />
            </IconButton>
          </Box>
          <Divider sx={{ mt: 1 }} />
        </Box>
      )}
    </Paper>
  );
};

export default AssignedToMeWidget;
