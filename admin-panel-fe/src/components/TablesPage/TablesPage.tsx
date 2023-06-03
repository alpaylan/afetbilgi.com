import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { toast } from 'material-react-toastify';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { tableDefinitions as tableDefinitionsAtom } from '../../atoms/Table';
import { TableDefinition } from '../../interfaces/TableDefinition';
import { getTableDefinitions } from '../../services/Table';
import { commonColors, commonStyles } from '../../util/Style';
import Appbar from '../Appbar/Appbar';
import Waiting from '../Waiting';
import EditTableDefinitionDialog from './EditTableDefinitionDialog/EditTableDefinitionDialog';
import TableCard from './TableCard';

const TablesPage = () => {
  const { t } = useTranslation();

  const [tableDefinitions, setTableDefinitions] =
    useRecoilState(tableDefinitionsAtom);

  const [loading, setLoading] = useState(false);

  const [tableDefinitionToEdit, setTableDefinitionToEdit] = useState(
    undefined as TableDefinition | undefined,
  );
  const [showNewTableDefinitionDialog, setShowNewTableDefinitionDialog] =
    useState(false);

  const refreshTableDefinitions = () => {
    setLoading(true);
    getTableDefinitions()
      .then((fetchedTableDefinitions) =>
        setTableDefinitions(fetchedTableDefinitions),
      )
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refreshTableDefinitions();
  }, []);

  const handleCloseDialog = () => {
    setTableDefinitionToEdit(undefined);
    setShowNewTableDefinitionDialog(false);
  };

  const handleModifyTableDefinitions = () => {
    toast.success(
      tableDefinitionToEdit ? t('table.updated') : t('table.created'),
    );
    setTableDefinitionToEdit(undefined);
    setShowNewTableDefinitionDialog(false);
    refreshTableDefinitions();
  };

  const handleDeleteTableDefinitions = () => {
    setTableDefinitionToEdit(undefined);
    setShowNewTableDefinitionDialog(false);
    refreshTableDefinitions();
  };

  return (
    <Box component='div'>
      <Appbar />
      <Waiting open={loading} />
      <EditTableDefinitionDialog
        open={!!tableDefinitionToEdit || showNewTableDefinitionDialog}
        tableDefinitionToEdit={tableDefinitionToEdit}
        onClose={handleCloseDialog}
        onConfirm={handleModifyTableDefinitions}
        onDelete={handleDeleteTableDefinitions}
      />
      <Paper
        sx={{
          backgroundColor: commonColors.gray1,
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          paddingX: 6,
          paddingY: 3.5,
          mt: 0.1,
        }}
      >
        <Box
          component='div'
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography sx={{ ...commonStyles.h3, pb: 1.5 }}>
            {t('table.table_definitions')}
          </Typography>
          <Typography
            sx={{ ...commonStyles.subtitle1, fontWeight: '400', fontSize: 14 }}
          >
            {t('table.page_description')}
          </Typography>
        </Box>
        <Box component='div' sx={{ flexGrow: 1 }} />
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon />}
          sx={{ ...commonStyles.buttonText, mt: 'auto', mb: 'auto' }}
          onClick={() => setShowNewTableDefinitionDialog(true)}
        >
          {t('table.new_table_definition')}
        </Button>
      </Paper>
      <Box component='div' sx={{ flexGrow: 1, px: 5, py: 2.5 }}>
        <Grid container spacing={2} columns={15} justifyContent='center'>
          {tableDefinitions.map((tableDefinition) => (
            <Grid item xs={15} sm={3}>
              <TableCard
                tableDefinition={tableDefinition}
                onEdit={() => setTableDefinitionToEdit(tableDefinition)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TablesPage;
