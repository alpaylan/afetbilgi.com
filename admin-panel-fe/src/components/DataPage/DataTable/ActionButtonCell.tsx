import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, TableCell } from '@mui/material';

interface ActionButtonCellProps {
  editable: boolean;
  onClick: () => void;
}

const ActionButtonCell = (props: ActionButtonCellProps) => {
  return (
    <TableCell key='edit-button'>
      <IconButton color='primary' onClick={props.onClick}>
        {props.editable ? <EditIcon /> : <VisibilityIcon />}
      </IconButton>
    </TableCell>
  );
};

export default ActionButtonCell;
