import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { toast } from 'material-react-toastify';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TableDefinition } from '../../interfaces/TableDefinition';
import { uploadDataCSV } from '../../services/Data';
import { generateRandomColumnValue } from '../../util/Column';
import { commonStyles } from '../../util/Style';
import ConfirmDialog from '../ConfirmDialog';
import UploadCSV from '../UploadCSV';
import Waiting from '../Waiting';

interface UploadDataDialogProps {
  open: boolean;
  tableDefinition: TableDefinition;
  onDone: () => void;
  onClose: () => void;
}

const UploadDataDialog = (props: UploadDataDialogProps) => {
  const { t } = useTranslation();

  const [file, setCurrentFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDownloadTemplate = () => {
    const csvRows = [
      props.tableDefinition.columns.map((column) => column.name),
    ];
    for (let i = 0; i < 3; i += 1) {
      csvRows.push(
        props.tableDefinition.columns.map((column) =>
          generateRandomColumnValue(column.type),
        ),
      );
    }

    const csvContent = csvRows.map((csvRow) => csvRow.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute(
      'download',
      `${props.tableDefinition.name.replaceAll(' ', '_')}_template.csv`,
    );
    a.click();
  };

  const handleUpload = () => {
    if (!file) {
      return;
    }
    setLoading(true);
    setShowConfirmDialog(false);
    uploadDataCSV(props.tableDefinition, file)
      .then((rowCount) => {
        toast.success(t('data.upload.confirm.done', { rowCount }));
        props.onDone();
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <Waiting open={loading} />
      <ConfirmDialog
        title={t('data.upload.confirm.title')}
        content={t('data.upload.confirm.content', {
          table: props.tableDefinition.name,
        })}
        okText={t('data.upload.confirm.confirm')}
        cancelText={t('data.upload.confirm.cancel')}
        open={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleUpload}
        color='primary'
      />
      <DialogTitle sx={{ ...commonStyles.h6, fontWeight: 'bold' }}>
        {t('data.upload.title')}
      </DialogTitle>
      <DialogContent>
        <Box component='div'>
          <UploadCSV setFile={setCurrentFile} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color='primary'
          onClick={handleDownloadTemplate}
          sx={commonStyles.buttonText}
        >
          {t('data.upload.download_template')}
        </Button>
        <Box component='div' sx={{ flexGrow: 1 }} />
        <Button
          variant='contained'
          color='inherit'
          onClick={props.onClose}
          sx={commonStyles.buttonText}
        >
          {t('data.upload.cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          disabled={!file}
          onClick={() => setShowConfirmDialog(true)}
          sx={commonStyles.buttonText}
        >
          {t('data.upload.upload')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadDataDialog;
