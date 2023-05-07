import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { cloneDeep, isEmpty } from 'lodash';
import { toast } from 'material-react-toastify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ColumnType,
  TableDefinition,
} from '../../../interfaces/TableDefinition';
import {
  createTableDefinition,
  deleteTableDefinition,
  updateTableDefinition,
} from '../../../services/Table';
import { commonColors, commonStyles } from '../../../util/Style';
import { getDefaultTableDefinition } from '../../../util/Table';
import Waiting from '../../Waiting';

interface EditTableDefinitionDialogProps {
  open: boolean;
  tableDefinitionToEdit?: TableDefinition;
  onClose: () => void;
  onConfirm: () => void;
  onDelete: () => void;
}

const EditTableDefinitionDialog = (props: EditTableDefinitionDialogProps) => {
  const { t } = useTranslation();

  const [currentState, setCurrentState] = useState(getDefaultTableDefinition());
  const [focusedColumn, setFocusedColumn] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const isEditing = !!props.tableDefinitionToEdit;

  const resetState = () => {
    setCurrentState(getDefaultTableDefinition());
    setFocusedColumn(null);
  };

  useEffect(() => {
    if (props.open) {
      setCurrentState(
        props.tableDefinitionToEdit
          ? cloneDeep(props.tableDefinitionToEdit)
          : getDefaultTableDefinition(),
      );
    } else {
      resetState();
    }
  }, [props.open]);

  const handleChangeName = (e: any) => {
    setCurrentState({
      ...currentState,
      name: e.target?.value ?? '',
    });
  };

  const handleMoveUp = () => {
    if (!focusedColumn) {
      return;
    }

    const newState = cloneDeep(currentState);
    newState.columns[focusedColumn] = currentState.columns[focusedColumn - 1];
    newState.columns[focusedColumn - 1] = currentState.columns[focusedColumn];
    setCurrentState(newState);
    setFocusedColumn(focusedColumn - 1);
  };

  const handleMoveDown = () => {
    if (
      focusedColumn === null ||
      focusedColumn === currentState.columns.length - 1
    ) {
      return;
    }

    const newState = cloneDeep(currentState);
    newState.columns[focusedColumn] = currentState.columns[focusedColumn + 1];
    newState.columns[focusedColumn + 1] = currentState.columns[focusedColumn];
    setCurrentState(newState);
    setFocusedColumn(focusedColumn + 1);
  };

  const handleAdd = () => {
    const newState = cloneDeep(currentState);
    newState.columns.push({
      name: 'New Column',
      type: ColumnType.TEXT,
      required: true,
    });
    setCurrentState(newState);
  };

  const handleRemove = () => {
    if (focusedColumn === null) {
      return;
    }

    const newState = cloneDeep(currentState);
    newState.columns = [
      ...currentState.columns.slice(0, focusedColumn),
      ...currentState.columns.slice(focusedColumn + 1),
    ];

    setCurrentState(newState);
    setFocusedColumn(null);
  };

  const handleChangeColumnName = (e: any, columnIndex: number) => {
    const newState = cloneDeep(currentState);
    newState.columns[columnIndex].name = e.target?.value ?? '';
    setCurrentState(newState);
  };

  const handleChangeColumnType = (e: any, columnIndex: number) => {
    const newState = cloneDeep(currentState);
    newState.columns[columnIndex].type = e.target.value;
    setCurrentState(newState);
  };

  const handleToggleRequired = (columnIndex: number) => {
    const newState = cloneDeep(currentState);
    newState.columns[columnIndex].required =
      !currentState.columns[columnIndex].required;
    setCurrentState(newState);
  };

  const handleDeleteTableDefinition = () => {
    setLoading(true);
    deleteTableDefinition(currentState.name)
      .then(props.onDelete)
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  const handleConfirm = () => {
    setLoading(true);
    if (isEditing) {
      updateTableDefinition(currentState)
        .then(props.onConfirm)
        .catch((err) => toast.error(err.message))
        .finally(() => setLoading(false));
    } else {
      createTableDefinition(currentState)
        .then(props.onConfirm)
        .catch((err) => toast.error(err.message))
        .finally(() => setLoading(false));
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <Waiting open={loading} />
      <DialogTitle>
        <Typography sx={{ ...commonStyles.h6, fontWeight: 'bold' }}>
          {t('table_modal.title')}
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box component='div' sx={{ flexDirection: 'column' }}>
          <TextField
            variant='outlined'
            size='small'
            label={t('table.name')}
            onChange={handleChangeName}
            value={currentState.name}
            disabled={isEditing}
          />
          <Typography sx={{ mt: 2, mb: 1 }}>{t('table.columns')}</Typography>
          <Divider />
          <Box
            component='div'
            sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}
          >
            <IconButton
              disabled={focusedColumn === null || focusedColumn === 0}
              onClick={handleMoveUp}
              size='small'
              sx={{ padding: 0 }}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
            <IconButton
              disabled={
                focusedColumn === null ||
                focusedColumn === currentState.columns.length - 1
              }
              onClick={handleMoveDown}
              size='small'
              sx={{ padding: 0 }}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
            <Box component='div' sx={{ flexGrow: 1 }} />
            <IconButton
              disabled={focusedColumn === null}
              onClick={handleRemove}
              size='small'
              sx={{ padding: 0 }}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton onClick={handleAdd} size='small' sx={{ padding: 0 }}>
              <AddIcon />
            </IconButton>
          </Box>
          <Box
            component='div'
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            {currentState.columns.map((column, i) => {
              let backgroundColor =
                i % 2 ? commonColors.white : commonColors.gray2;

              if (focusedColumn === i) {
                backgroundColor = commonColors.blue1;
              }

              return (
                <Box
                  component='div'
                  onFocus={() => setFocusedColumn(i)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexGrow: 1,
                    pt: 1,
                    pb: 1,
                    pl: 1.5,
                    backgroundColor,
                  }}
                >
                  <TextField
                    variant='outlined'
                    size='small'
                    value={column.name}
                    onChange={(e) => handleChangeColumnName(e, i)}
                    sx={{ backgroundColor: commonColors.white }}
                  />
                  <Box
                    component='div'
                    onClick={() => setFocusedColumn(i)}
                    sx={{ flexGrow: 1, minWidth: 50 }}
                  />
                  <Select
                    variant='standard'
                    size='small'
                    value={column.type}
                    onChange={(e) => handleChangeColumnType(e, i)}
                    sx={{ minWidth: 150 }}
                  >
                    {Object.keys(ColumnType).map((columnTypeName) => {
                      const columnType =
                        columnTypeName as keyof typeof ColumnType;

                      return (
                        <MenuItem
                          id={columnType}
                          value={ColumnType[columnType]}
                          key={columnType}
                        >
                          {t(`column.${ColumnType[columnType]}`)}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <Box
                    component='div'
                    onClick={() => setFocusedColumn(i)}
                    sx={{ flexGrow: 1, minWidth: 50 }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={column.required}
                        onChange={() => handleToggleRequired(i)}
                        size='small'
                      />
                    }
                    label={
                      <Typography sx={commonStyles.body2}>
                        {t('column.required')}
                      </Typography>
                    }
                    sx={{ mt: 'auto', mb: 'auto' }}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        {isEditing && (
          <Button
            size='small'
            onClick={handleDeleteTableDefinition}
            sx={{ ...commonStyles.buttonText, color: commonColors.statusRed }}
          >
            {t('delete')}
          </Button>
        )}
        <Box component='div' sx={{ flexGrow: 1 }} />
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
          onClick={handleConfirm}
          disabled={isEmpty(currentState.columns) || currentState.name === ''}
          sx={commonStyles.buttonText}
        >
          {t('confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTableDefinitionDialog;
