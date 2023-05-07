import { Box, Button, Popover, TableCell, Typography } from '@mui/material';
import { toast } from 'material-react-toastify';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { assignRow } from '../../../services/Assignment';
import { getUsername } from '../../../util/Auth';
import { commonColors, commonStyles } from '../../../util/Style';
import Waiting from '../../Waiting';
import TableStringField from './TableStringField';

interface AssignedToFieldProps {
  tableName: string;
  rowID: string;
  assignedTo?: string;
  onAssign: () => void;
}

const AssignedToField = (props: AssignedToFieldProps) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAssign = () => {
    setLoading(true);
    assignRow(props.tableName, props.rowID)
      .then(() => {
        toast.success('Row successfully assigned');
        props.onAssign();
      })
      .catch((err) => toast.error(err.message))
      .finally(() => {
        setLoading(false);
        setAnchorEl(null);
      });
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const username = getUsername();

  return props.assignedTo ? (
    <TableStringField key='assigned-to'>
      {username === props.assignedTo
        ? `${username} (${t('data.table.me')})`
        : props.assignedTo}
    </TableStringField>
  ) : (
    <TableCell key='assigned-to'>
      <Waiting open={loading} />
      <Box
        component='div'
        onClick={handleClick}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
        sx={{
          flexGrow: 1,
          backgroundColor: isFocused ? commonColors.gray3 : undefined,
        }}
      >
        <Typography
          sx={{
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '14px',
            lineHeight: '24px',
          }}
        >
          -
        </Typography>
      </Box>
      <Popover
        id={anchorEl ? 'popover' : undefined}
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Button onClick={handleAssign} sx={{ ...commonStyles.buttonText }}>
          {t('data.table.assign_to_me')}
        </Button>
      </Popover>
    </TableCell>
  );
};

export default AssignedToField;
