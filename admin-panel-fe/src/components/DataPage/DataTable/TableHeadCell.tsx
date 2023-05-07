import { TableCell, Typography } from '@mui/material';

interface TableHeadCellProps {
  children: string;
}

const TableHeadCell = (props: TableHeadCellProps) => {
  return (
    <TableCell>
      <Typography
        sx={{
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '14px',
          lineHeight: '16px',
        }}
      >
        {props.children}
      </Typography>
    </TableCell>
  );
};

export default TableHeadCell;
