import { Box, Button } from '@mui/material';
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
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Button size="large" onClick={props.onBack}>
          Geri
        </Button>
      </Box>

      <Box sx={{ textAlign: 'center', height: '80%', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center' }}>
        {renderData()}
      </Box>
    </Box>
  );
};
