import { Box, Button, Popover, TableCell, Typography } from '@mui/material';
import { toast } from 'material-react-toastify';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { users as usersAtom } from '../../../atoms/User';
import { assignRow } from '../../../services/Assignment';
import { getUserID, getUsername } from '../../../util/Auth';
import { commonColors, commonStyles } from '../../../util/Style';
import Waiting from '../../Waiting';
import TableStringField from './TableStringField';

interface AssignedToFieldProps {
  tableName: string;
  rowID: string;
  assignedTo?: string;
  assignable: boolean;
  onAssign: () => void;
}

const AssignedToField = (props: AssignedToFieldProps) => {
  const { t } = useTranslation();

  const users = useRecoilValue(usersAtom);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAssign = () => {
    setLoading(true);
    assignRow(props.tableName, props.rowID, getUserID())
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

  const userID = getUserID();

  return props.assignedTo ? (
    <TableStringField key='assigned-to'>
      {userID === props.assignedTo
        ? `${getUsername()} (${t('data.table.me')})`
        : users.find((user) => user.id === props.assignedTo)?.name ??
          props.assignedTo}
    </TableStringField>
  ) : (
    <TableCell key='assigned-to'>
      <Waiting open={loading} />
      <Box
        component='div'
        onClick={props.assignable ? handleClick : undefined}
        onMouseEnter={props.assignable ? () => setIsFocused(true) : undefined}
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
