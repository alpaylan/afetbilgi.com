import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Autocomplete,
  Box,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { cloneDeep, isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { tableDefinitions as tableDefinitionsAtom } from '../../../../atoms/Table';
import { NewOutputDialogState } from '../../../../interfaces/Output/Output';
import { TableDefinition } from '../../../../interfaces/TableDefinition';
import { commonColors } from '../../../../util/Style';

interface SetPageFormProps {
  currentState: NewOutputDialogState;
  onChange: (newState: NewOutputDialogState) => void;
}

const SetPageForm = (props: SetPageFormProps) => {
  const { t } = useTranslation();

  const tableDefinitions = useRecoilValue(tableDefinitionsAtom);

  const [focusedQuestion, setFocusedQuestion] = useState<number | null>(null);
  const [selectedAvailableColumns, setSelectedAvailableColumns] = useState<
    string[]
  >([]);
  const [selectedLeafs, setSelectedLeafs] = useState<string[]>([]);

  const selectedTableDefinition = tableDefinitions.find(
    (definition) => definition.name === props.currentState.page.table,
  );

  const availableColumnsForQuestion = (
    selectedTableDefinition?.columns ?? []
  ).filter(
    (column) =>
      !props.currentState.page.questions
        .map((question) => question.column)
        .includes(column.name),
  );

  const availableColumnsForLeaf = (
    selectedTableDefinition?.columns ?? []
  ).filter((column) => !props.currentState.page.leafs.includes(column.name));

  useEffect(() => {
    setFocusedQuestion(null);
    setSelectedAvailableColumns([]);
    setSelectedLeafs([]);
    props.onChange({
      ...props.currentState,
      page: { ...props.currentState.page, questions: [], leafs: [] },
    });
  }, [props.currentState.page.table]);

  useEffect(() => {
    setSelectedAvailableColumns([]);
    setSelectedLeafs([]);
  }, [props.currentState.page.questions]);

  const handleChangeName = (e: any) => {
    props.onChange({
      ...props.currentState,
      page: { ...props.currentState.page, name: e.target.value },
    });
  };

  const handleSelectTableDefinition = (
    _: any,
    tableDefinition: TableDefinition | null,
  ) => {
    props.onChange({
      ...props.currentState,
      page: { ...props.currentState.page, table: tableDefinition?.name },
    });
  };

  const handleChangeQuestionText = (e: any, questionIndex: number) => {
    const newPage = cloneDeep(props.currentState.page);
    newPage.questions[questionIndex].text = e.target?.value ?? '';
    props.onChange({ ...props.currentState, page: newPage });
  };

  const handleChangeQuestionColumn = (e: any, questionIndex: number) => {
    const newPage = cloneDeep(props.currentState.page);
    newPage.questions[questionIndex].column = e.target?.value;
    props.onChange({ ...props.currentState, page: newPage });
  };

  const handleAddQuestion = () => {
    if (isEmpty(availableColumnsForQuestion)) {
      return;
    }
    const newPage = cloneDeep(props.currentState.page);
    newPage.questions.push({
      text: '',
      column: availableColumnsForQuestion[0].name,
    });
    props.onChange({ ...props.currentState, page: newPage });
  };

  const handleRemoveQuestion = () => {
    if (focusedQuestion === null) {
      return;
    }

    const newPage = cloneDeep(props.currentState.page);
    newPage.questions = [
      ...props.currentState.page.questions.slice(0, focusedQuestion),
      ...props.currentState.page.questions.slice(focusedQuestion + 1),
    ];
    props.onChange({ ...props.currentState, page: newPage });
    setFocusedQuestion(null);
  };

  const handleMoveQuestionUp = () => {
    if (!focusedQuestion) {
      return;
    }

    const newPage = cloneDeep(props.currentState.page);
    newPage.questions[focusedQuestion] =
      props.currentState.page.questions[focusedQuestion - 1];
    newPage.questions[focusedQuestion - 1] =
      props.currentState.page.questions[focusedQuestion];

    props.onChange({ ...props.currentState, page: newPage });
    setFocusedQuestion(focusedQuestion - 1);
  };

  const handleMoveQuestionDown = () => {
    if (
      focusedQuestion === null ||
      focusedQuestion === props.currentState.page.questions.length - 1
    ) {
      return;
    }

    const newPage = cloneDeep(props.currentState.page);
    newPage.questions[focusedQuestion] =
      props.currentState.page.questions[focusedQuestion + 1];
    newPage.questions[focusedQuestion + 1] =
      props.currentState.page.questions[focusedQuestion];

    props.onChange({ ...props.currentState, page: newPage });
    setFocusedQuestion(focusedQuestion + 1);
  };

  const handleClickAvailableColumn = (columnName: string) => {
    setSelectedAvailableColumns(
      selectedAvailableColumns.includes(columnName)
        ? selectedAvailableColumns.filter((name) => columnName !== name)
        : [...selectedAvailableColumns, columnName],
    );
  };

  const handleClickLeaf = (columnName: string) => {
    setSelectedLeafs(
      selectedLeafs.includes(columnName)
        ? selectedLeafs.filter((name) => columnName !== name)
        : [...selectedLeafs, columnName],
    );
  };

  const handleMoveColumnsRight = () => {
    props.onChange({
      ...props.currentState,
      page: {
        ...props.currentState.page,
        leafs: [...props.currentState.page.leafs, ...selectedAvailableColumns],
      },
    });

    setSelectedAvailableColumns([]);
    setSelectedLeafs([]);
  };

  const handleMoveAllColumnsRight = () => {
    props.onChange({
      ...props.currentState,
      page: {
        ...props.currentState.page,
        leafs: (selectedTableDefinition?.columns ?? []).map(
          (column) => column.name,
        ),
      },
    });

    setSelectedAvailableColumns([]);
    setSelectedLeafs([]);
  };

  const handleMoveColumnsLeft = () => {
    props.onChange({
      ...props.currentState,
      page: {
        ...props.currentState.page,
        leafs: props.currentState.page.leafs.filter(
          (column) => !selectedLeafs.includes(column),
        ),
      },
    });

    setSelectedAvailableColumns([]);
    setSelectedLeafs([]);
  };

  const handleMoveAllColumnsLeft = () => {
    props.onChange({
      ...props.currentState,
      page: {
        ...props.currentState.page,
        leafs: [],
      },
    });

    setSelectedAvailableColumns([]);
    setSelectedLeafs([]);
  };

  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        pt: 1.5,
      }}
    >
      <TextField
        size='small'
        label={t('output.dialog.page.name')}
        value={props.currentState.page.name}
        sx={{ mb: 1.5, width: 350 }}
        onChange={handleChangeName}
        error={props.currentState.page.name === ''}
      />
      <Autocomplete
        renderInput={(params) => (
          <TextField
            {...params}
            size='small'
            label={t('output.dialog.page.table')}
            variant='outlined'
            sx={{
              width: 350,
              backgroundColor: commonColors.white,
            }}
          />
        )}
        options={tableDefinitions}
        getOptionLabel={(definition) => definition.name}
        value={selectedTableDefinition ?? null}
        onChange={handleSelectTableDefinition}
      />
      <Typography sx={{ mt: 2, mb: 1 }}>
        {t('output.dialog.page.questions')}
      </Typography>
      <Divider />
      <Box
        component='div'
        sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}
      >
        <IconButton
          disabled={focusedQuestion === null || focusedQuestion === 0}
          onClick={handleMoveQuestionUp}
          size='small'
          sx={{ padding: 0 }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
        <IconButton
          disabled={
            focusedQuestion === null ||
            focusedQuestion === props.currentState.page.questions.length - 1
          }
          onClick={handleMoveQuestionDown}
          size='small'
          sx={{ padding: 0 }}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
        <Box component='div' sx={{ flexGrow: 1 }} />
        <IconButton
          disabled={focusedQuestion === null}
          onClick={handleRemoveQuestion}
          size='small'
          sx={{ padding: 0 }}
        >
          <RemoveIcon />
        </IconButton>
        <IconButton
          disabled={isEmpty(availableColumnsForQuestion)}
          onClick={handleAddQuestion}
          size='small'
          sx={{ padding: 0 }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      {props.currentState.page.questions.map((question, i) => {
        let backgroundColor = i % 2 ? commonColors.white : commonColors.gray2;

        if (focusedQuestion === i) {
          backgroundColor = commonColors.blue1;
        }

        return (
          <Box
            component='div'
            onFocus={() => setFocusedQuestion(i)}
            onClick={() => setFocusedQuestion(i)}
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
              label={t('output.dialog.page.question')}
              value={question.text}
              error={question.text.trim().length === 0}
              onChange={(e) => handleChangeQuestionText(e, i)}
              sx={{ backgroundColor: commonColors.white, minWidth: 250 }}
            />
            <FormControl
              sx={{
                minWidth: 150,
                ml: 1.5,
              }}
            >
              <InputLabel id='column-select'>
                {t('output.dialog.page.column')}
              </InputLabel>
              <Select
                variant='outlined'
                size='small'
                labelId='column-select'
                label={t('output.dialog.page.column')}
                value={question.column}
                onChange={(e) => handleChangeQuestionColumn(e, i)}
                sx={{
                  backgroundColor: commonColors.white,
                }}
              >
                {[
                  ...availableColumnsForQuestion.map((column) => column.name),
                  question.column,
                ].map((column) => (
                  <MenuItem id={column} value={column} key={column}>
                    {column}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        );
      })}
      <Grid
        container
        columns={7}
        spacing={1.5}
        alignItems='center'
        sx={{ flexGrow: 1, display: 'flex', mt: 1.5 }}
      >
        <Grid item xs={3}>
          <Typography>{t('output.dialog.page.available')}</Typography>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <Typography>{t('output.dialog.page.leafs')}</Typography>
        </Grid>
        <Grid item xs={7}>
          <Divider />
        </Grid>
        <Grid item xs={3}>
          <Paper
            sx={{
              display: 'flex',
              flexGrow: 1,
              height: 200,
              overflow: 'auto',
              backgroundColor: commonColors.gray1,
            }}
          >
            <List dense component='div' role='list' sx={{ flexGrow: 1 }}>
              {availableColumnsForLeaf.map((column) => (
                <ListItem
                  key={column.name}
                  role='listitem'
                  button
                  onClick={() => handleClickAvailableColumn(column.name)}
                  sx={{
                    backgroundColor: selectedAvailableColumns.includes(
                      column.name,
                    )
                      ? commonColors.blue1
                      : undefined,
                  }}
                >
                  <ListItemText id={column.name} primary={column.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Box
            component='div'
            sx={{
              display: 'flex',
              flexGrow: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton
              color='primary'
              disabled={isEmpty(availableColumnsForLeaf)}
              onClick={handleMoveAllColumnsRight}
            >
              <KeyboardDoubleArrowRightIcon />
            </IconButton>
            <IconButton
              color='primary'
              disabled={isEmpty(selectedAvailableColumns)}
              onClick={handleMoveColumnsRight}
            >
              <ChevronRight />
            </IconButton>
            <IconButton
              color='primary'
              disabled={isEmpty(selectedLeafs)}
              onClick={handleMoveColumnsLeft}
            >
              <ChevronLeft />
            </IconButton>
            <IconButton
              color='primary'
              disabled={isEmpty(props.currentState.page.leafs)}
              onClick={handleMoveAllColumnsLeft}
            >
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Paper
            sx={{
              display: 'flex',
              flexGrow: 1,
              height: 200,
              overflow: 'auto',
              backgroundColor: commonColors.gray1,
            }}
          >
            <List dense component='div' role='list' sx={{ flexGrow: 1 }}>
              {props.currentState.page.leafs.map((column) => (
                <ListItem
                  key={column}
                  role='listitem'
                  button
                  onClick={() => handleClickLeaf(column)}
                  sx={{
                    backgroundColor: selectedLeafs.includes(column)
                      ? commonColors.blue1
                      : undefined,
                  }}
                >
                  <ListItemText id={column} primary={column} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SetPageForm;
