import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { pipelineStages as pipelineStagesAtom } from '../../../atoms/Pipeline';
import { Row, TableData } from '../../../interfaces/Data';
import { PaginationOptions } from '../../../interfaces/Pagination';
import {
  ColumnDefinition,
  ColumnType,
} from '../../../interfaces/TableDefinition';
import { getAuthorizedPipelineStages, getUserID } from '../../../util/Auth';
import { formatLocalTime } from '../../../util/DateTime';
import { commonColors, commonStyles } from '../../../util/Style';
import DataDialog from '../DataDialog/DataDialog';
import UploadDataDialog from '../UploadDataDialog';
import ActionButtonCell from './ActionButtonCell';
import AssignedToField from './AssignedToField';
import TableHeadCell from './TableHeadCell';
import TableStringField from './TableStringField';

interface DataTableProps {
  tableData: TableData;
  onUpdate: () => void;
}

const DataTable = (props: DataTableProps) => {
  const { t } = useTranslation();

  const pipelineStages = useRecoilValue(pipelineStagesAtom);

  const [clickedRow, setClickedRow] = useState<Row | undefined>(undefined);
  const [pagination, setPagination] = useState<PaginationOptions>({
    page: 1,
    rowsPerPage: 5,
  });
  const [showNewRowDialog, setShowNewRowDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  const authorizedPipelineStages = getAuthorizedPipelineStages();

  // TODO
  const renderColumn = (definition: ColumnDefinition, value: string) => {
    switch (definition.type) {
      case ColumnType.TEXT:
        return (
          <TableStringField key={definition.name}>{value}</TableStringField>
        );
      default:
        return (
          <TableStringField key={definition.name}>{value}</TableStringField>
        );
    }
  };

  const handleCloseDialog = () => {
    setClickedRow(undefined);
    setShowNewRowDialog(false);
  };

  const handleEdit = () => {
    setClickedRow(undefined);
    setShowNewRowDialog(false);
    setShowUploadDialog(false);
    props.onUpdate();
  };

  const rows = props.tableData.rows.slice(
    (pagination.page - 1) * pagination.rowsPerPage,
    pagination.page * pagination.rowsPerPage,
  );

  return (
    <Box
      component='div'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        marginTop: 6,
      }}
    >
      <DataDialog
        open={!!clickedRow || showNewRowDialog}
        row={clickedRow}
        tableDefinition={props.tableData.tableDefinition}
        onDone={handleEdit}
        onClose={handleCloseDialog}
      />
      <UploadDataDialog
        open={showUploadDialog}
        tableDefinition={props.tableData.tableDefinition}
        onDone={handleEdit}
        onClose={() => setShowUploadDialog(false)}
      />
      <Box
        component='div'
        sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}
      >
        <Typography
          sx={{
            ...commonStyles.h5,
            color: commonColors.black,
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
        >
          {props.tableData.tableName}
        </Typography>
        <Box component='div' sx={{ flexGrow: 1 }} />
        <Button
          color='primary'
          variant='contained'
          size='small'
          startIcon={<AddIcon />}
          onClick={() => setShowNewRowDialog(true)}
          sx={{
            ...commonStyles.buttonText,
            marginTop: 'auto',
            marginBottom: 'auto',
            marginRight: 1,
          }}
        >
          {t('data.table.new_row')}
        </Button>
        <Button
          color='primary'
          variant='contained'
          size='small'
          startIcon={<UploadFileIcon />}
          onClick={() => setShowUploadDialog(true)}
          sx={{
            ...commonStyles.buttonText,
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
        >
          {t('data.table.upload')}
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: 'column',
          marginTop: 2,
          backgroundColor: commonColors.gray1,
        }}
      >
        <Table size='small'>
          <TableHead sx={{ backgroundColor: commonColors.gray2 }}>
            <TableRow>
              <TableHeadCell>{t('data.table.id')}</TableHeadCell>
              <TableHeadCell>{t('data.table.columns')}</TableHeadCell>
              {props.tableData.tableDefinition.columns
                .slice(0, 3)
                .map((column) => (
                  <TableHeadCell>{column.name}</TableHeadCell>
                ))}
              <TableHeadCell>{t('data.table.last_updated_by')}</TableHeadCell>
              <TableHeadCell>{t('data.table.last_updated_at')}</TableHeadCell>
              <TableHeadCell>{t('data.table.stage')}</TableHeadCell>
              <TableHeadCell>{t('data.table.assigned_to')}</TableHeadCell>
              <TableHeadCell>{t('data.table.action')}</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const stage = pipelineStages.find(
                (pipelineStage) => pipelineStage.id === row.stage,
              );

              return (
                <TableRow key={row.id}>
                  <TableStringField key='id'>{row.id}</TableStringField>
                  <TableStringField key='columns'>
                    {row.columns.length.toString()}
                  </TableStringField>
                  {row.columns
                    .slice(0, 3)
                    .map((column, i) =>
                      renderColumn(
                        props.tableData.tableDefinition.columns[i],
                        column,
                      ),
                    )}
                  <TableStringField key='last-updated-by'>
                    {row.lastUpdatedBy}
                  </TableStringField>
                  <TableStringField key='last-updated-at'>
                    {formatLocalTime(row.lastUpdatedAt)}
                  </TableStringField>
                  <TableStringField key='stage'>
                    {stage?.name ?? t('data.table.stage.unknown')}
                  </TableStringField>
                  <AssignedToField
                    tableName={props.tableData.tableName}
                    rowID={row.id}
                    assignedTo={row.assignedTo}
                    assignable={authorizedPipelineStages.includes(row.stage)}
                    onAssign={props.onUpdate}
                  />
                  <ActionButtonCell
                    editable={row.assignedTo === getUserID()}
                    onClick={() => setClickedRow(row)}
                  />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          count={props.tableData.rows.length}
          page={pagination.page - 1}
          onPageChange={(_, newPage) =>
            setPagination({ ...pagination, page: newPage + 1 })
          }
          rowsPerPage={pagination.rowsPerPage}
          onRowsPerPageChange={(e) =>
            setPagination({
              page: 1,
              rowsPerPage: parseInt(e.target.value, 10),
            })
          }
          rowsPerPageOptions={[5, 10, 15, 25, 50]}
          component='div'
        />
      </TableContainer>
    </Box>
  );
};

export default DataTable;
