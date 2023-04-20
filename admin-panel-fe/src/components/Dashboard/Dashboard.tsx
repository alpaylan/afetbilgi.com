import { Box, Grid } from '@mui/material';
import Appbar from '../Appbar/Appbar';
import AssignedToMeWidget from './widgets/AssignedToMeWidget';
import DataStatisticsWidget from './widgets/DataStatisticsWidget';
import PipelineWidget from './widgets/PipelineWidget';
import TableDefinitionsWidget from './widgets/TableDefinitionsWidget';

const Dashboard = () => {
  return (
    <Box component='div' flexGrow={1}>
      <Appbar />
      <Grid
        container
        spacing={3}
        columns={12}
        justifyContent='center'
        sx={{ padding: 2 }}
      >
        <Grid item xs={12} sm={5}>
          <DataStatisticsWidget />
        </Grid>
        <Grid item xs={12} sm={5}>
          <PipelineWidget />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TableDefinitionsWidget />
        </Grid>
        <Grid item xs={12} sm={5}>
          <AssignedToMeWidget />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
