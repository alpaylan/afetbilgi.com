import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, IconButton, Paper, Skeleton, Typography } from '@mui/material';
import { cloneDeep } from 'lodash';
import { toast } from 'material-react-toastify';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { pipelineStages as pipelineStagesAtom } from '../../atoms/Pipeline';
import { PipelineStage } from '../../interfaces/Pipeline';
import { getPipelineStages, savePipelineStages } from '../../services/Pipeline';
import { commonColors } from '../../util/Style';
import Waiting from '../Waiting';
import NewStageDialog from './NewStageDialog';

interface PipelineChartProps {
  maxStages?: number;
  readonly?: boolean;
  shouldSave?: boolean;
  showNewStageDialog?: boolean;
  onModify?: (changesExist: boolean) => void;
  onCloseNewStageDialog?: () => void;
}

const PipelineChart = (props: PipelineChartProps) => {
  const [pipelineStages, setPipelineStages] =
    useRecoilState(pipelineStagesAtom);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentPipelineStages, setCurrentPipelineStages] = useState(
    [] as PipelineStage[],
  );
  const [hoveredStage, setHoveredStage] = useState(-1);

  const refreshPipelineStages = () => {
    setLoading(true);
    getPipelineStages()
      .then((stages) => setPipelineStages(stages))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refreshPipelineStages();
  }, []);

  useEffect(
    () => setCurrentPipelineStages(cloneDeep(pipelineStages)),
    [pipelineStages],
  );

  useEffect(() => {
    if (props.onModify) {
      props.onModify(
        JSON.stringify(pipelineStages) !==
          JSON.stringify(currentPipelineStages),
      );
    }
  }, [currentPipelineStages, pipelineStages]);

  useEffect(() => {
    if (props.shouldSave) {
      setSaving(true);
      savePipelineStages()
        .then(refreshPipelineStages)
        .catch((err) => toast.error(err.message))
        .finally(() => setSaving(false));
    }
  }, [props.shouldSave]);

  const handleMoveUp = (index: number) => {
    const newStages = cloneDeep(currentPipelineStages);
    const tempStage = newStages[index];
    newStages[index] = newStages[index - 1];
    newStages[index - 1] = tempStage;

    setCurrentPipelineStages(newStages);
  };

  const handleMoveDown = (index: number) => {
    const newStages = cloneDeep(currentPipelineStages);
    const tempStage = newStages[index];
    newStages[index] = newStages[index + 1];
    newStages[index + 1] = tempStage;

    setCurrentPipelineStages(newStages);
  };

  const handleDelete = (index: number) => {
    const newStages = [
      ...currentPipelineStages.slice(0, index),
      ...currentPipelineStages.slice(index + 1),
    ];

    setCurrentPipelineStages(newStages);
  };

  const handleCloseNewStageDialog = () => {
    if (props.onCloseNewStageDialog) {
      props.onCloseNewStageDialog();
    }
  };

  const handleNewStage = (newStage: PipelineStage) => {
    const newStages = [...currentPipelineStages, newStage];

    setCurrentPipelineStages(newStages);
    handleCloseNewStageDialog();
  };

  const stagesToDisplay = props.maxStages
    ? currentPipelineStages.slice(0, props.maxStages)
    : currentPipelineStages;

  return (
    <Box
      component='div'
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Waiting open={saving} />
      <NewStageDialog
        open={props.showNewStageDialog ?? false}
        onClose={handleCloseNewStageDialog}
        onConfirm={handleNewStage}
      />
      {loading ? (
        <Box component='div' sx={{ flexGrow: 1, justifyContent: 'center' }}>
          <Skeleton variant='text' sx={{ fontSize: '32px' }} />
          <Skeleton variant='circular' width={40} height={40} />
          <Skeleton variant='rectangular' width={210} height={60} />
          <Skeleton variant='rounded' width={210} height={60} />
        </Box>
      ) : (
        <Box onMouseLeave={() => setHoveredStage(-1)}>
          {stagesToDisplay.map((stage, i) => (
            <Box onMouseEnter={() => setHoveredStage(i)}>
              <Box
                component='div'
                sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}
              >
                <Paper
                  sx={{
                    p: 2,
                    m: 0.5,
                    backgroundColor: commonColors.primary,
                    color: commonColors.white,
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  {!props.readonly &&
                    hoveredStage === i &&
                    stagesToDisplay.length > 1 && (
                      <IconButton
                        sx={{ color: commonColors.white, padding: 0, mr: 0.5 }}
                        onClick={() => handleDelete(i)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  <Typography
                    sx={{ fontWeight: 'bold', mt: 'auto', mb: 'auto' }}
                  >
                    {stage.name}
                  </Typography>
                  {!props.readonly && hoveredStage === i && (
                    <Box
                      component='div'
                      sx={{ flexDirection: 'row', display: 'flex' }}
                    >
                      {i > 0 && (
                        <IconButton
                          sx={{ color: commonColors.white, padding: 0 }}
                          onClick={() => handleMoveUp(i)}
                        >
                          <KeyboardArrowUpIcon />
                        </IconButton>
                      )}
                      {i < stagesToDisplay.length - 1 && (
                        <IconButton
                          sx={{ color: commonColors.white, padding: 0 }}
                          onClick={() => handleMoveDown(i)}
                        >
                          <KeyboardArrowDownIcon />
                        </IconButton>
                      )}
                    </Box>
                  )}
                </Paper>
              </Box>
              {i < stagesToDisplay.length - 1 && (
                <Box
                  component='div'
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <ArrowDownwardIcon color='primary' />
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PipelineChart;
