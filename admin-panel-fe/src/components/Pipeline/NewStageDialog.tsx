import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PipelineStage } from '../../interfaces/Pipeline';
import { getDefaultPipelineStage } from '../../util/Pipeline';
import { commonStyles } from '../../util/Style';

interface NewStageDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (newStage: PipelineStage) => void;
}

const NewStageDialog = (props: NewStageDialogProps) => {
  const { t } = useTranslation();

  const [currentState, setCurrentState] = useState(getDefaultPipelineStage());

  const resetState = () => {
    setCurrentState(getDefaultPipelineStage());
  };

  useEffect(() => {
    if (!props.open) {
      resetState();
    }
  }, [props.open]);

  const handleChangeName = (e: any) => {
    const newName = (e.target.value ?? '') as string;
    const newID = newName.replaceAll(' ', '_').toUpperCase();
    setCurrentState({ id: newID, name: newName });
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>
        <Typography sx={{ ...commonStyles.h6, fontWeight: 'bold' }}>
          {t('pipeline_modal.title')}
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box component='div' sx={{ flexDirection: 'column', display: 'flex' }}>
          <TextField
            variant='outlined'
            size='small'
            label={t('pipeline_modal.stage_id')}
            value={currentState.id}
            disabled
          />
          <TextField
            variant='outlined'
            size='small'
            label={t('pipeline_modal.stage_name')}
            value={currentState.name}
            onChange={handleChangeName}
            sx={{ mt: 1.5 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color='primary'
          size='small'
          onClick={props.onClose}
          sx={commonStyles.buttonText}
        >
          {t('cancel')}
        </Button>
        <Button
          color='primary'
          size='small'
          disabled={currentState.name === ''}
          onClick={() => props.onConfirm(currentState)}
          sx={commonStyles.buttonText}
        >
          {t('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewStageDialog;
