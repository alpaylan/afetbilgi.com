import { Box, Grid } from '@mui/material';
import Appbar from '../Appbar/Appbar';
import AssignedToMeWidget from './widgets/AssignedToMeWidget';
import DataStatisticsWidget from './widgets/DataStatisticsWidget';
import PipelineWidget from './widgets/PipelineWidget';
import SupportedLocalesWidget from './widgets/SupportedLocalesWidget';
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
        sx={{ paddingX: 3, paddingY: 2 }}
      >
        <Grid item xs={12} sm={6}>
          <DataStatisticsWidget />
        </Grid>
        <Grid item xs={12} sm={6}>
          <PipelineWidget />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TableDefinitionsWidget />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AssignedToMeWidget />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SupportedLocalesWidget />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
