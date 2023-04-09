import { ChevronRight } from '@mui/icons-material';
import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { commonStyles } from '../../../util/Style';
import PipelineChart from '../../Pipeline/PipelineChart';

const PipelineWidget = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleNavigate = (to: string) => {
    if (navigate) {
      navigate(to);
    }
  };

  return (
    <Paper sx={{ flexGrow: 1, padding: 2, height: '95%' }}>
      <Box component='div' sx={commonStyles.row}>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          {t('pipeline.pipeline_stages')}
        </Typography>
        <Box component='div' flexGrow={1} />
        <Button
          color='primary'
          size='small'
          onClick={() => handleNavigate('/pipeline')}
          endIcon={<ChevronRight />}
          sx={commonStyles.buttonText}
        >
          {t('view_more')}
        </Button>
      </Box>
      <Divider sx={{ mb: 1.5 }} />
      <PipelineChart maxStages={5} readonly />
    </Paper>
  );
};

export default PipelineWidget;
