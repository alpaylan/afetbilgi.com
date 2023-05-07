import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, IconButton } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { toast } from 'material-react-toastify';
import { useTranslation } from 'react-i18next';
import { TextValidator } from 'react-material-ui-form-validator';
import { ColumnDefinition } from '../../../../interfaces/TableDefinition';
import { commonColors } from '../../../../util/Style';

interface TextFieldInputProps {
  disabled?: boolean;
  value: string;
  onChange: (newValue: string) => void;
  columnDefinition: ColumnDefinition;
}

const TextFieldInput = (props: TextFieldInputProps) => {
  const { t } = useTranslation();

  const classes = useStyles();

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
    props.onChange(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(props.value)
      .then(() => toast.success(t('data.dialog.copied')))
      .catch((err) => toast.error(err.message));
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
        size='small'
        multiline
        disabled={props.disabled}
        name={
          props.columnDefinition.name +
          (props.columnDefinition.required ? '*' : '')
        }
        value={props.value}
        error={!requirementSatisfied}
        helperText={
          requirementSatisfied ? undefined : t('data.dialog.required')
        }
        onChange={handleChange}
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

export default TextFieldInput;
