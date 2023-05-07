import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';
import { Row } from '../../../../interfaces/Data';
import {
  ColumnDefinition,
  ColumnType,
  TableDefinition,
} from '../../../../interfaces/TableDefinition';
import { commonStyles } from '../../../../util/Style';
import StringFieldSummary from './StringFieldSummary';

interface DataSummaryCardProps {
  title: string;
  color: string;
  tableDefinition: TableDefinition;
  data: Row;
}

const DataSummaryCard = (props: DataSummaryCardProps) => {
  const renderColumn = (columnDefinition: ColumnDefinition, value: string) => {
    switch (columnDefinition.type) {
      case ColumnType.TEXT:
        return (
          <StringFieldSummary
            columnDefinition={columnDefinition}
            value={value}
          />
        );
      default:
        return (
          <StringFieldSummary
            columnDefinition={columnDefinition}
            value={value}
          />
        );
    }
  };

  return (
    <Card>
      <CardHeader
        title={
          <Typography sx={commonStyles.subtitle2}>{props.title}</Typography>
        }
        sx={{ p: 1, backgroundColor: props.color }}
      />
      <Divider />
      <CardContent sx={{ p: 1 }}>
        {props.tableDefinition.columns.map((column, i) =>
          renderColumn(column, props.data.columns[i]),
        )}
      </CardContent>
    </Card>
  );
};

export default DataSummaryCard;
