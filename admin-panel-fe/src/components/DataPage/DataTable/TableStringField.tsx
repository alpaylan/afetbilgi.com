import { TableCell, Typography } from '@mui/material';

interface TableStringFieldProps {
  key?: string;
  children: string;
}

const TableStringField = (props: TableStringFieldProps) => {
  return (
    <TableCell key={props.key} title={props.children}>
      <Typography
        sx={{
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '14px',
          lineHeight: '24px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {props.children}
      </Typography>
    </TableCell>
  );
};

export default TableStringField;
