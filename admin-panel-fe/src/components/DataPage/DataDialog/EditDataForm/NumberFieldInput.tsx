import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, IconButton } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { isFinite } from 'lodash';
import { toast } from 'material-react-toastify';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TextValidator } from 'react-material-ui-form-validator';
import { ColumnDefinition } from '../../../../interfaces/TableDefinition';
import { commonColors } from '../../../../util/Style';

interface NumberFieldInputProps {
  disabled?: boolean;
  value: string;
  onChange: (newValue: string) => void;
  columnDefinition: ColumnDefinition;
}

const NumberFieldInput = (props: NumberFieldInputProps) => {
  const { t } = useTranslation();

  const classes = useStyles();

  const [isFocused, setIsFocused] = useState(false);
  const [plainTextValue, setPlainTextValue] = useState('');

  let requirementSatisfied = true;

  const validators = [];
  const errorMessages = [];
  if (props.columnDefinition.required) {
    validators.push('required');
    errorMessages.push(t('data.dialog.required'));

    if (props.value === '') {
      requirementSatisfied = false;
    }
  }

  const handleChange = (e: any) => {
    const newValue = parseFloat(e.target.value);
    props.onChange(isFinite(newValue) ? newValue.toFixed(2) : '');
    setPlainTextValue(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(props.value)
      .then(() => toast.success(t('data.dialog.copied')))
      .catch((err) => toast.error(err.message));
  };

  const getFormattedValue = (): string => {
    if (isFocused) {
      return plainTextValue;
    }

    return props.value;
  };

  const handleFocus = () => {
    setIsFocused(true);
    setPlainTextValue(getFormattedValue());
  };

  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        flexDirection: 'row',
        mb: 1.5,
        mt: 1.5,
      }}
    >
      <TextValidator
        label={
          props.columnDefinition.name +
          (props.columnDefinition.required ? '*' : '')
        }
        variant='outlined'
        type='number'
        size='small'
        disabled={props.disabled}
        name={
          props.columnDefinition.name +
          (props.columnDefinition.required ? '*' : '')
        }
        value={getFormattedValue()}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        onFocus={handleFocus}
        error={!requirementSatisfied}
        helperText={
          requirementSatisfied ? undefined : t('data.dialog.required')
        }
        validators={validators}
        errorMessages={errorMessages}
        className={classes.textField}
      />
      <IconButton
        onClick={handleCopy}
        color='primary'
        sx={{ mt: 'auto', mb: 'auto' }}
      >
        <ContentCopyIcon />
      </IconButton>
    </Box>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    textField: {
      mr: 1.5,
      width: 420,
      backgroundColor: commonColors.white,
    },
  }),
);

export default NumberFieldInput;
