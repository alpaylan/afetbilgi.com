import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataNode } from '../interfaces/TreeNode';
import BankData from './data/BankData';
import CityBarinma from './data/CityBarinmaData';
import ItemData from './data/ItemData';
import URLData from './data/URLData';

export default function Data({ dataNode }: { dataNode: DataNode }) {
  const navigate = useNavigate();

  const renderData = () => {
    if (dataNode.data.dataType === 'city-barinma') {
      return <CityBarinma value={dataNode.data as any} />
    }

    if (dataNode.data.dataType === 'item-list') {
      return <ItemData value={dataNode.data as any} />
    }

    if (dataNode.data.dataType === 'url-donation') {
      return <URLData value={dataNode.data as any} />
    }

    if (dataNode.data.dataType === 'international-url-donation') {
      return <URLData value={dataNode.data as any} />
    }

    if (dataNode.data.dataType === 'international-bank-account-donation') {
      return <BankData value={dataNode.data as any} />
    }

    return <></>;
  };

  return (
    <Box>
      <Box sx={{ mt: 3, mb: 3, textAlign: 'center' }}>
        <Button size="large" onClick={() => navigate(-1)}>
          Geri
        </Button>
      </Box>

      <Box sx={{ textAlign: 'center', height: '80%', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center', alignItems: 'center' }}>
        {renderData()}
      </Box>
    </Box>
  );
};
