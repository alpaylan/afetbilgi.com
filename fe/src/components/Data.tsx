import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { DataNode, DataValue } from '../interfaces/TreeNode';
import { useSharedStyles } from '../utilities/Styles';
import BankData from './data/BankData';
import CityBarinma from './data/CityBarinmaData';
import ItemData from './data/ItemData';
import URLData from './data/URLData';

interface DataProps {
  dataNode: DataNode;
  onBack?: () => void;
}

const Data = (props: DataProps) => {
  const { classes } = useStyles();
  const sharedClasses = useSharedStyles().classes;

  const renderData = () => {
    if (props.dataNode.data.dataType === 'city-barinma') {
      return <CityBarinma value={props.dataNode.data as any} />
    }

    if (props.dataNode.data.dataType === 'item-list') {
      return <ItemData value={props.dataNode.data as any} />
    }

    if (props.dataNode.data.dataType === 'url-donation') {
      return <URLData value={props.dataNode.data as any} />
    }

    if (props.dataNode.data.dataType === 'international-url-donation') {
      return <URLData value={props.dataNode.data as any} />
    }

    if (props.dataNode.data.dataType === 'international-bank-account-donation') {
      return <BankData value={props.dataNode.data as any} />
    }

    return (
      <Paper className={classes.paper}>
        {Object.keys(props.dataNode.data)
          .filter((key) => key !== 'dataType')
          .map((key) => (
            <Box component='div' className={classes.row}>
              <Typography>{`${key}: `}</Typography>
              <Box component='div' className={classes.horizontalSpacer} />
              <Box component='div' className={classes.horizontalWidth} />
              <Typography>
                {props.dataNode.data[key as keyof DataValue]}
              </Typography>
            </Box>
          ))}
      </Paper>
    );
  };

  return (
    <Box className={classes.mainWrapper}>
      <Box component='div' className={classes.horizontalCenter}>
        <Button onClick={props.onBack} className={sharedClasses.buttonText}>
          Geri
        </Button>
      </Box>

      <Grid
        container
        spacing={0.75}
        direction='column'
        alignItems='center'
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={4}>
          {renderData()}
        </Grid>
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles()((theme) => ({
  mainWrapper: {
    flexGrow: 1,
    flexDirection: 'column',
    padding: theme.spacing(1.5),
  },
  horizontalCenter: {
    flexGrow: 1,
    textAlign: 'center',
  },
  paper: {
    flexDirection: 'column',
    width: 'fit-content',
    padding: theme.spacing(1.5),
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  horizontalSpacer: {
    flexGrow: 1,
    minWidth: 25,
  },
  horizontalWidth: {
    width: 25,
  },
}));
export default Data;
