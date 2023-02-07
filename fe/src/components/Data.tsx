import { Box, Button, Grid } from '@mui/material';
import { DataNode } from '../interfaces/TreeNode';
import BankData from './data/BankData';
import CityBarinma from './data/CityBarinmaData';
import ItemData from './data/ItemData';
import URLData from './data/URLData';

interface DataProps {
  dataNode: DataNode;
  onBack?: () => void;
}

export default function Data(props: DataProps) {
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

    return <></>;
  };

  return (
    <Box>
      <Box component="div">
        <Button onClick={props.onBack}>
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
