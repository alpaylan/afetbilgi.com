import { ChevronRight } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import { toast } from 'material-react-toastify';
import { useEffect, useState } from 'react';
import AnimatedNumber from 'react-animated-numbers';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getDataStatistics } from '../../../services/Data';
import { getDefaultDataStatistics } from '../../../util/Data';
import { commonStyles } from '../../../util/Style';

const DataStatisticsWidget = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [dataStatistics, setDataStatistics] = useState(
    getDefaultDataStatistics(),
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDataStatistics()
      .then((fetchedDataStatistic) => setDataStatistics(fetchedDataStatistic))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleNavigate = (to: string) => {
    if (navigate) {
      navigate(to);
    }
  };

  return (
    <Paper sx={{ flexGrow: 1, padding: 2, height: '95%' }}>
      <Box component='div' sx={commonStyles.row}>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          {t('data.data')}
        </Typography>
        <Box component='div' flexGrow={1} />
        <Button
          color='primary'
          size='small'
          onClick={() => handleNavigate('/data')}
          endIcon={<ChevronRight />}
          sx={commonStyles.buttonText}
        >
          {t('view_more')}
        </Button>
      </Box>
      <Divider sx={{ mb: 1.5 }} />
      {loading ? (
        <>
          <Skeleton variant='text' sx={{ fontSize: '32px' }} />
          <Skeleton variant='circular' width={40} height={40} />
          <Skeleton variant='rectangular' width={210} height={60} />
          <Skeleton variant='rounded' width={210} height={60} />
        </>
      ) : (
        <Box
          component='div'
          sx={{
            height: '80%',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            component='div'
            sx={{
              display: 'flex',
              flexDirection: 'row-wrap',
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'center',
              mt: 'auto',
              mb: 'auto',
            }}
          >
            <Box
              component='div'
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <AnimatedNumber
                includeComma
                fontStyle={{
                  fontStyle: 'normal',
                  fontSize: 80,
                  fontWeight: 'bold',
                }}
                animateToNumber={dataStatistics.rowCount}
              />
              <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
                {t('data.rows')}
              </Typography>
            </Box>
            <Box
              component='div'
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <AnimatedNumber
                includeComma
                fontStyle={{
                  fontStyle: 'normal',
                  fontSize: 80,
                  fontWeight: 'bold',
                }}
                animateToNumber={dataStatistics.tableCount}
              />
              <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
                {t('data.tables')}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default DataStatisticsWidget;
