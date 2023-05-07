import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { cloneDeep } from 'lodash';
import { toast } from 'material-react-toastify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { pipelineStages as pipelineStagesAtom } from '../../../atoms/Pipeline';
import { Row } from '../../../interfaces/Data';
import { TableDefinition } from '../../../interfaces/TableDefinition';
import {
  createRow,
  moveRowToPreviousStage,
  updateRow,
} from '../../../services/Data';
import { getUsername } from '../../../util/Auth';
import { getEmptyRow } from '../../../util/Data';
import { commonStyles } from '../../../util/Style';
import ConfirmDialog from '../../ConfirmDialog';
import Waiting from '../../Waiting';
import CompareData from './CompareData/CompareData';
import EditDataForm from './EditDataForm/EditDataForm';

interface DataDialogProps {
  open: boolean;
  row?: Row;
  tableDefinition: TableDefinition;
  onDone: () => void;
  onClose: () => void;
}

const DataDialog = (props: DataDialogProps) => {
  const { t } = useTranslation();

  const pipelineStages = useRecoilValue(pipelineStagesAtom);

  enum Step {
    EDIT,
    COMPARE,
  }

  const [currentState, setCurrentState] = useState<Row>(
    getEmptyRow(props.tableDefinition, pipelineStages),
  );
  const [isInvalid, setIsInvalid] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [step, setStep] = useState(Step.EDIT);
  const [loading, setLoading] = useState(false);

  const isEditing = props.row?.assignedTo === getUsername();

  useEffect(() => {
    if (props.row) {
      setCurrentState(cloneDeep(props.row));
    } else {
      setCurrentState(getEmptyRow(props.tableDefinition, pipelineStages));
      setStep(Step.EDIT);
      setIsInvalid(false);
    }
  }, [props.row, props.open]);

  const handleDeleteOrMoveBack = () => {
    setShowConfirmDialog(false);
    setLoading(true);
    moveRowToPreviousStage(props.tableDefinition, currentState)
      .then(() => {
        toast.success(
          currentState.stage === pipelineStages[0]?.id
            ? t('data.dialog.deleted')
            : t('data.dialog.moved_to_previous_stage'),
        );
        props.onDone();
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  const handleBack = () => {
    if (step === Step.EDIT) {
      props.onClose();
    } else {
      setStep(Step.EDIT);
    }
  };

  const handleNext = () => {
    if (step === Step.EDIT) {
      setStep(Step.COMPARE);
    } else {
      let promise: Promise<void>;
      if (props.row) {
        promise = updateRow(props.tableDefinition, currentState);
      } else {
        promise = createRow(props.tableDefinition, currentState);
      }

      setLoading(true);
      promise
        .then(() => {
          toast.success(
            props.row
              ? t('data.dialog.toaster.updated')
              : t('data.dialog.toaster.created'),
          );
          props.onDone();
        })
        .catch((err) => toast.error(err.message))
        .finally(() => setLoading(false));
    }
  };

  const getTitle = (): string => {
    if (props.row) {
      return isEditing
        ? t('data.dialog.title.edit')
        : t('data.dialog.title.view');
    }

    return t('data.dialog.title.create');
  };

  const renderBody = () =>
    step === Step.EDIT ? (
      <EditDataForm
        currentState={currentState}
        tableDefinition={props.tableDefinition}
        onEdit={(newState) => setCurrentState(newState)}
        onError={(invalid) => setIsInvalid(invalid)}
      />
    ) : (
      <CompareData
        currentState={props.row}
        newState={currentState}
        tableDefinition={props.tableDefinition}
      />
    );

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth>
      <ConfirmDialog
        title={t('data.dialog.confirm.are_you_sure')}
        content={
          currentState.stage === pipelineStages[0]?.id
            ? t('data.dialog.confirm.delete')
            : t('data.dialog.confirm.move_back')
        }
        okText={t('data.dialog.confirm')}
        cancelText={t('data.dialog.cancel')}
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleDeleteOrMoveBack}
        color='error'
      />
      <Waiting open={loading} />
      <DialogTitle sx={{ ...commonStyles.h6, fontWeight: 'bold' }}>
        {getTitle()}
      </DialogTitle>
      <DialogContent>{renderBody()}</DialogContent>
      <DialogActions>
        {isEditing && (
          <Button
            variant='contained'
            color='error'
            onClick={() => setShowConfirmDialog(true)}
            sx={{ ...commonStyles.buttonText }}
          >
            {currentState.stage === pipelineStages[0]?.id
              ? t('data.dialog.delete')
              : t('data.dialog.previous_stage')}
          </Button>
        )}
        <Box component='div' sx={{ flexGrow: 1 }} />
        <Button
          variant='contained'
          color='inherit'
          onClick={handleBack}
          sx={commonStyles.buttonText}
        >
          {step === Step.EDIT ? t('data.dialog.cancel') : t('data.dialog.back')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          disabled={(!isEditing && !!props.row) || isInvalid}
          onClick={handleNext}
          sx={commonStyles.buttonText}
        >
          {step === Step.EDIT ? t('data.dialog.next') : t('data.dialog.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DataDialog;
