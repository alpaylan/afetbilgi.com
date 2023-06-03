import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { toast } from 'material-react-toastify';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Action } from '../../../interfaces/Action';
import {
  NewOutputDialogStep,
  OutputKind,
} from '../../../interfaces/Output/Output';
import { addNewPage } from '../../../services/Page';
import { isAllowed } from '../../../util/Action';
import {
  getDefaultNewOutputDialogState,
  validateNewPage,
} from '../../../util/Output/Output';
import { commonStyles } from '../../../util/Style';
import Waiting from '../../Waiting';
import SelectOutputType from './Steps/SelectOutputType/SelectOutputType';
import SetPageForm from './Steps/SetPageForm';

interface NewOutputDialogProps {
  open: boolean;
  onDone: () => void;
  onClose: () => void;
}

const NewOutputDialog = (props: NewOutputDialogProps) => {
  const { t } = useTranslation();

  const [currentState, setCurrentState] = useState(
    getDefaultNewOutputDialogState(),
  );
  const [loading, setLoading] = useState(false);

  const nextStepExists = currentState.step === NewOutputDialogStep.SELECT_TYPE;

  const canGoNext = () => {
    switch (currentState.step) {
      case NewOutputDialogStep.SELECT_TYPE: {
        return true;
      }
      case NewOutputDialogStep.SET_PAGE: {
        return validateNewPage(currentState);
      }
      default: {
        return false;
      }
    }
  };

  const renderBody = () => {
    switch (currentState.step) {
      case NewOutputDialogStep.SELECT_TYPE:
        return (
          <SelectOutputType
            currentState={currentState}
            onChange={setCurrentState}
          />
        );
      case NewOutputDialogStep.SET_PAGE:
        return (
          <SetPageForm currentState={currentState} onChange={setCurrentState} />
        );
      default:
        return <></>;
    }
  };

  const navigateToNextStep = () => {
    switch (currentState.kind) {
      case OutputKind.PAGE: {
        setCurrentState({
          ...currentState,
          step: NewOutputDialogStep.SET_PAGE,
        });
        break;
      }
      default:
        break;
    }
  };

  const handleAddNewPage = () => {
    setLoading(true);
    addNewPage(currentState.page)
      .then(() => props.onDone())
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  const handleBack = () => {
    switch (currentState.step) {
      case NewOutputDialogStep.SELECT_TYPE: {
        props.onClose();
        break;
      }
      case NewOutputDialogStep.SET_PAGE: {
        setCurrentState({
          ...currentState,
          step: NewOutputDialogStep.SELECT_TYPE,
        });
        break;
      }
      default:
        break;
    }
  };

  const handleNext = () => {
    switch (currentState.step) {
      case NewOutputDialogStep.SELECT_TYPE: {
        navigateToNextStep();
        break;
      }
      case NewOutputDialogStep.SET_PAGE: {
        handleAddNewPage();
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth>
      <Waiting open={loading} />
      <DialogTitle sx={{ ...commonStyles.h6, fontWeight: 'bold' }}>
        {t(`output.dialog.title.${currentState.step}`)}
      </DialogTitle>
      <DialogContent>{renderBody()}</DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          color='inherit'
          onClick={handleBack}
          sx={commonStyles.buttonText}
        >
          {currentState.step === NewOutputDialogStep.SELECT_TYPE
            ? t('cancel')
            : t('back')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          disabled={!isAllowed(Action.EDIT_OUTPUTS) || !canGoNext()}
          onClick={handleNext}
          sx={commonStyles.buttonText}
        >
          {nextStepExists ? t('next') : t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewOutputDialog;
