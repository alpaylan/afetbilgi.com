import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { toast } from 'material-react-toastify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { localeConfig as localeConfigAtom } from '../../atoms/Locale';
import { tableDefinitions as tableDefinitionsAtom } from '../../atoms/Table';
import { Action } from '../../interfaces/Action';
import { OutputSummary } from '../../interfaces/Output/Output';
import { getLocaleConfig } from '../../services/Locale';
import { getOutputSummaries, toggleOutputState } from '../../services/Output';
import { getTableDefinitions } from '../../services/Table';
import { isAllowed } from '../../util/Action';
import { commonColors, commonStyles } from '../../util/Style';
import Appbar from '../Appbar/Appbar';
import Waiting from '../Waiting';
import NewOutputDialog from './NewOutputDialog/NewOutputDialog';
import OutputCard from './OutputCard';

const OutputPage = () => {
  const { t } = useTranslation();

  const setTableDefinitions = useSetRecoilState(tableDefinitionsAtom);
  const setLocaleConfig = useSetRecoilState(localeConfigAtom);

  const [loadingLocaleConfig, setLoadingLocaleConfig] = useState(false);
  const [loadingTableDefinitions, setLoadingTableDefinitions] = useState(false);
  const [loadingOutputSummaries, setLoadingOutputSummaries] = useState(false);
  const [outputSummaries, setOutputSummaries] = useState<OutputSummary[]>([]);
  const [showNewOutputDialog, setShowNewOutputDialog] = useState(false);

  const refreshOutputSummaries = () => {
    setLoadingOutputSummaries(true);
    getOutputSummaries()
      .then((summaries) => setOutputSummaries(summaries))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoadingOutputSummaries(false));
  };

  useEffect(() => {
    setLoadingTableDefinitions(true);
    getTableDefinitions()
      .then((fetchedTableDefinitions) =>
        setTableDefinitions(fetchedTableDefinitions.slice(0, 5)),
      )
      .catch((err) => toast.error(err.message))
      .finally(() => setLoadingTableDefinitions(false));

    setLoadingLocaleConfig(true);
    getLocaleConfig()
      .then((config) => setLocaleConfig(config))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoadingLocaleConfig(false));

    refreshOutputSummaries();
  }, []);

  const handleAddNewOutput = () => {
    setShowNewOutputDialog(false);
  };

  const handleNavigateToOutputPage = (_outputSummary: OutputSummary) => {
    // TODO
  };

  const handleToggleOutputSummary = (id: string) => {
    setLoadingOutputSummaries(true);
    toggleOutputState(id)
      .then(refreshOutputSummaries)
      .catch((err) => {
        toast.error(err.message);
        setLoadingOutputSummaries(false);
      });
  };

  const loading =
    loadingLocaleConfig || loadingTableDefinitions || loadingOutputSummaries;

  return (
    <Box component='div'>
      <Appbar />
      <Waiting open={loading} />
      <NewOutputDialog
        open={showNewOutputDialog}
        onDone={handleAddNewOutput}
        onClose={() => setShowNewOutputDialog(false)}
      />
      <Paper
        sx={{
          backgroundColor: commonColors.gray1,
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          paddingX: 6,
          paddingY: 3.5,
          mt: 0.1,
        }}
      >
        <Box
          component='div'
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography sx={{ ...commonStyles.h3, pb: 1.5 }}>
            {t('output.outputs')}
          </Typography>
          <Typography
            sx={{ ...commonStyles.subtitle1, fontWeight: '400', fontSize: 14 }}
          >
            {t('output.page_description')}
          </Typography>
        </Box>
        <Box component='div' sx={{ flexGrow: 1 }} />
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon />}
          disabled={!isAllowed(Action.EDIT_OUTPUTS)}
          onClick={() => setShowNewOutputDialog(true)}
          sx={{ ...commonStyles.buttonText, mt: 'auto', mb: 'auto' }}
        >
          {t('output.new_output')}
        </Button>
      </Paper>
      <Box component='div' sx={{ flexGrow: 1, px: 5, py: 2.5 }}>
        <Grid container spacing={2} columns={15} justifyContent='center'>
          {outputSummaries.map((summary) => (
            <Grid item xs={15} sm={3}>
              <OutputCard
                outputSummary={summary}
                onEdit={() => handleNavigateToOutputPage(summary)}
                onToggle={() => handleToggleOutputSummary(summary.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default OutputPage;
