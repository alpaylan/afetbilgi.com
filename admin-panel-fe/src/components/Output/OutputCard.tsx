import { ChevronRight } from '@mui/icons-material';
import { Box, Button, Card, Link, Switch, Typography } from '@mui/material';
import { toast } from 'material-react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { dataFilters as dataFiltersAtom } from '../../atoms/Data';
import { Action } from '../../interfaces/Action';
import { OutputIconProps, OutputSummary } from '../../interfaces/Output/Output';
import { isAllowed } from '../../util/Action';
import { formatLocalTime } from '../../util/DateTime';
import { getOutputIcon } from '../../util/Output/Output';
import { commonColors, commonStyles } from '../../util/Style';

interface OutputSummaryFieldProps {
  title: string;
  value: string;
  onClick?: () => void;
}

const OutputSummaryField = (props: OutputSummaryFieldProps) => {
  return (
    <Box component='div' sx={{ mt: 0.75, mb: 0.25 }}>
      <Typography
        sx={{
          ...commonStyles.subtitle2,
          color: commonColors.gray5,
          textTransform: 'uppercase',
        }}
      >
        {props.title}
      </Typography>
      {props.onClick ? (
        <Link
          sx={{
            ...commonStyles.subtitle1,
            cursor: 'pointer',
          }}
          onClick={props.onClick}
        >
          {props.value}
        </Link>
      ) : (
        <Typography
          sx={{
            ...commonStyles.subtitle1,
          }}
        >
          {props.value}
        </Typography>
      )}
    </Box>
  );
};

interface OutputCardProps {
  outputSummary: OutputSummary;
  onEdit: () => void;
  onToggle: () => void;
}

const OutputCard = (props: OutputCardProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const setDataFilters = useSetRecoilState(dataFiltersAtom);

  const handleNavigate = (to: string) => {
    if (navigate) {
      navigate(to);
    }
  };

  const iconProps: OutputIconProps = {
    fontSize: 'large',
    sx: {
      color: props.outputSummary.isActive
        ? commonColors.primary
        : commonColors.gray5,
    },
  };

  const handleViewTable = (tableName: string) => {
    setDataFilters({
      selectedTableNames: [tableName],
      selectedStages: [],
      onlyAssignedToMe: true,
    });

    handleNavigate('/data');
  };

  const handleToggle = () => {
    if (!isAllowed(Action.EDIT_OUTPUTS)) {
      toast.error(t('output.summary.toggle.error'));
    } else {
      props.onToggle();
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <Box component='div' sx={{ m: 1 }}>
        <Box
          component='div'
          sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}
        >
          {getOutputIcon(props.outputSummary.kind, iconProps)}
          <Typography variant='h5' sx={{ ml: 1 }}>
            {props.outputSummary.name}
          </Typography>
          <Box component='div' flexGrow={1} />
          <Button
            onClick={props.onEdit}
            color='primary'
            size='small'
            endIcon={<ChevronRight />}
            sx={commonStyles.buttonText}
          >
            {t('edit')}
          </Button>
        </Box>
        <OutputSummaryField
          title={t('output.summary.type')}
          value={t(`output.kind.${props.outputSummary.kind}`)}
        />
        <OutputSummaryField
          title={t('output.summary.table')}
          value={props.outputSummary.table}
          onClick={() => handleViewTable(props.outputSummary.table)}
        />
        <OutputSummaryField
          title={t('output.summary.last_updated_at')}
          value={formatLocalTime(props.outputSummary.lastUpdatedAt)}
        />
        <OutputSummaryField
          title={t('output.summary.last_updated_by')}
          value={props.outputSummary.lastUpdatedBy}
        />
        <Box
          component='div'
          sx={{ display: 'flex', flexDirection: 'row', mb: 0.25 }}
        >
          <Typography
            sx={{
              ...commonStyles.subtitle2,
              color: commonColors.gray5,
              textTransform: 'uppercase',
              mt: 'auto',
              mb: 'auto',
            }}
          >
            {t('output.summary.active')}
          </Typography>
          <Switch
            size='small'
            color='primary'
            checked={props.outputSummary.isActive}
            onClick={handleToggle}
            sx={{ mt: 'auto', mb: 'auto', ml: 0.5 }}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default OutputCard;
