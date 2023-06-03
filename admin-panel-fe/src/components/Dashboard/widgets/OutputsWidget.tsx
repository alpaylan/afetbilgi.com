import { ChevronRight } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Box,
  Button,
  Divider,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { toast } from 'material-react-toastify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { OutputSummary } from '../../../interfaces/Output/Output';
import { getOutputSummaries } from '../../../services/Output';
import { formatLocalTime } from '../../../util/DateTime';
import { commonColors, commonStyles } from '../../../util/Style';

const OutputsWidget = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [outputSummaries, setOutputSummaries] = useState<OutputSummary[]>([]);

  useEffect(() => {
    setLoading(true);
    getOutputSummaries()
      .then((summaries) => setOutputSummaries(summaries))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleNavigate = (to: string) => {
    if (navigate) {
      navigate(to);
    }
  };

  const fieldNameStyle = {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
  };

  return (
    <Paper sx={{ flexGrow: 1, padding: 2, height: '95%' }}>
      <Box component='div' sx={commonStyles.row}>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          {t('output.widget.title')}
        </Typography>
        <Box component='div' flexGrow={1} />
        <Button
          color='primary'
          size='small'
          onClick={() => handleNavigate('/outputs')}
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
        <TableContainer
          sx={{
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
            backgroundColor: commonColors.gray1,
          }}
        >
          <Table size='small'>
            <TableHead sx={{ backgroundColor: commonColors.gray2 }}>
              <TableRow>
                <TableCell key='name'>
                  <Typography sx={fieldNameStyle}>
                    {t('output.summary.name')}
                  </Typography>
                </TableCell>
                <TableCell key='type'>
                  <Typography sx={fieldNameStyle}>
                    {t('output.summary.type')}
                  </Typography>
                </TableCell>
                <TableCell key='table'>
                  <Typography sx={fieldNameStyle}>
                    {t('output.summary.table')}
                  </Typography>
                </TableCell>
                <TableCell key='last-updated-at'>
                  <Typography sx={fieldNameStyle}>
                    {t('output.summary.last_updated_at')}
                  </Typography>
                </TableCell>
                <TableCell key='last-updated-by'>
                  <Typography sx={fieldNameStyle}>
                    {t('output.summary.last_updated_by')}
                  </Typography>
                </TableCell>
                <TableCell key='active' align='center'>
                  <Typography sx={fieldNameStyle}>
                    {t('output.widget.active')}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {outputSummaries.slice(0, 5).map((summary) => (
                <TableRow key={summary.id}>
                  <TableCell key={`${summary.id}_name`}>
                    <Typography>{summary.name}</Typography>
                  </TableCell>
                  <TableCell key={`${summary.id}_type`}>
                    <Typography>{t(`output.kind.${summary.kind}`)}</Typography>
                  </TableCell>
                  <TableCell key={`${summary.id}_table`}>
                    <Typography>{summary.table}</Typography>
                  </TableCell>
                  <TableCell key={`${summary.id}_last_updated_at`}>
                    <Typography>
                      {formatLocalTime(summary.lastUpdatedAt)}
                    </Typography>
                  </TableCell>
                  <TableCell key={`${summary.id}_last_updated_by`}>
                    <Typography>{summary.lastUpdatedBy}</Typography>
                  </TableCell>
                  <TableCell key={`${summary.id}_active`} align='center'>
                    {summary.isActive ? (
                      <CheckCircleIcon
                        sx={{ color: commonColors.statusGreen }}
                      />
                    ) : (
                      <CancelIcon sx={{ color: commonColors.statusRed }} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default OutputsWidget;
