import { Box } from '@mui/material';
import { cloneDeep } from 'lodash';
import { createRef, useEffect } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Row } from '../../../../interfaces/Data';
import {
  ColumnDefinition,
  ColumnType,
  TableDefinition,
} from '../../../../interfaces/TableDefinition';
import { getUserID } from '../../../../util/Auth';
import NumberFieldInput from './NumberFieldInput';
import TextFieldInput from './TextFieldInput';

interface EditDataFormProps {
  currentState?: Row;
  tableDefinition: TableDefinition;
  onEdit: (newState: Row) => void;
  onError: (isInvalid: boolean) => void;
}

const EditDataForm = (props: EditDataFormProps) => {
  const validatorRef = createRef<ValidatorForm>();

  useEffect(() => {
    validatorRef.current?.isFormValid(false).then((isValid) => {
      props.onError(!isValid);
    });
  }, [props.currentState]);

  const handleChange = (index: number, newValue: string) => {
    if (props.currentState?.assignedTo === getUserID()) {
      const newColumns = cloneDeep(props.currentState.columns);
      newColumns[index] = newValue;
      props.onEdit({ ...props.currentState, columns: newColumns });
    }
  };

  const generateInput = (columnDefinition: ColumnDefinition, index: number) => {
    if (!props.currentState) {
      return <></>;
    }

    switch (columnDefinition.type) {
      case ColumnType.TEXT:
        return (
          <TextFieldInput
            disabled={props.currentState.assignedTo !== getUserID()}
            value={props.currentState.columns[index]}
            onChange={(newValue) => handleChange(index, newValue)}
            columnDefinition={columnDefinition}
          />
        );
      case ColumnType.NUMBER:
        return (
          <NumberFieldInput
            disabled={props.currentState.assignedTo !== getUserID()}
            value={props.currentState.columns[index]}
            onChange={(newValue) => handleChange(index, newValue)}
            columnDefinition={columnDefinition}
          />
        );
      default:
        return (
          <TextFieldInput
            disabled={props.currentState.assignedTo !== getUserID()}
            value={props.currentState.columns[index]}
            onChange={(newValue) => handleChange(index, newValue)}
            columnDefinition={columnDefinition}
          />
        );
    }
  };

  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {props.currentState ? (
        <ValidatorForm
          instantValidate
          onSubmit={() => {}}
          onError={() => props.onError(true)}
          ref={validatorRef}
        >
          {props.tableDefinition.columns.map((column, i) =>
            generateInput(column, i),
          )}
        </ValidatorForm>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default EditDataForm;
