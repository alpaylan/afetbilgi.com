import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { commonColors, commonStyles } from '../../util/Style';
import Appbar from '../Appbar/Appbar';
import PipelineChart from './PipelineChart';

const PipelinePage = () => {
  const { t } = useTranslation();

  const [isModified, setIsModified] = useState(false);
  const [shouldSave, setShouldSave] = useState(false);
  const [showNewStageDialog, setShowNewStageDialog] = useState(false);

  useEffect(() => {
    if (!isModified) {
      setShouldSave(false);
    }
  }, [isModified]);

  return (
    <Box component='div'>
      <Appbar />
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
            {t('pipeline.pipeline_stages')}
          </Typography>
          <Typography
            sx={{ ...commonStyles.subtitle1, fontWeight: '400', fontSize: 14 }}
          >
            {t('pipeline.page_description')}
          </Typography>
        </Box>
        <Box component='div' sx={{ flexGrow: 1 }} />
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon />}
          onClick={() => setShowNewStageDialog(true)}
          sx={{ ...commonStyles.buttonText, mt: 'auto', mb: 'auto' }}
        >
          {t('pipeline.new_stage')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          startIcon={<SaveIcon />}
          disabled={!isModified}
          onClick={() => setShouldSave(true)}
          sx={{ ...commonStyles.buttonText, mt: 'auto', mb: 'auto', ml: 1.5 }}
        >
          {t('save')}
        </Button>
      </Paper>
      <Box component='div' sx={{ flexGrow: 1, px: 5, py: 2.5 }}>
        <PipelineChart
          shouldSave={shouldSave}
          showNewStageDialog={showNewStageDialog}
          onModify={(modified) => setIsModified(modified)}
          onCloseNewStageDialog={() => setShowNewStageDialog(false)}
        />
      </Box>
    </Box>
  );
};

export default PipelinePage;
