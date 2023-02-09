import { Box } from '@mui/material';
import { DataNode } from '../interfaces/TreeNode';
import BankData from './data/BankData';
import CityAccommodation from './data/CityAccommodation';
import CreditCardData from './data/CreditCardData';
import HelpItemData from './data/HelpItemData';
import GatheringData from './data/GatheringData';
import URLData from './data/URLData';
import SMSData from './data/SMSData';
import BloodDonationData from './data/BloodDonationData';
import TelephoneData from './data/PhoneData';
import ArticleData from './data/ArticleData';
import UsefulLinksData from './data/UsefulLinksdata';
import StemCellData from './data/StemCellData';
import VetData from './data/VetData';
import FoodDistributionData from './data/FoodDistributionData';
import VpnData from './data/VpnData';
import ContainerPharmacyData from './data/ContainerPharmacyData';
import { DataType } from '../variables/TreeNode';

export default function Data({ dataNode }: { dataNode: DataNode }) {
  const renderData = () => {
    const dataType = dataNode.data.dataType as DataType;

    switch (dataType) {
      case DataType.BANK_ACCOUNT_DONATION:
        return <BankData value={dataNode.data as any} />;

      case DataType.BENEFICIAL_ARTICLES:
        return <ArticleData value={dataNode.data as any} />;

      case DataType.BLOOD_DONATION_LIST:
        return <BloodDonationData value={dataNode.data as any} />;

      case DataType.CITY_ACCOMMODATION:
        return <CityAccommodation value={dataNode.data as any} />;

      case DataType.CREDIT_CARD_DONATION:
        return <CreditCardData value={dataNode.data as any} />;

      case DataType.INTERNATIONAL_BANK_ACCOUNT_DONATION:
        return <BankData value={dataNode.data as any} />;

      case DataType.INTERNATIONAL_URL_DONATION:
        return <URLData value={dataNode.data as any} />;

      case DataType.NEW_GATHERING_LIST:
        return <GatheringData value={dataNode.data as any} />;

      case DataType.HELP_ITEM_LIST:
        return <HelpItemData value={dataNode.data as any} />;

      case DataType.PHONE_NUMBER_LIST:
        return <TelephoneData value={dataNode.data as any} />;

      case DataType.SMS_DONATION:
        return <SMSData value={dataNode.data as any} />;

      case DataType.URL_DONATION:
        return <URLData value={dataNode.data as any} />;

      case DataType.USEFUL_LINKS:
        return <UsefulLinksData value={dataNode.data as any} />;

      case DataType.STEM_CELL_DONATION:
        return <StemCellData value={dataNode.data as any} />;

      case DataType.DATA_VET:
        return <VetData value={dataNode.data as any} />;

      case DataType.FOOD_ITEMS:
        return <FoodDistributionData value={dataNode.data as any} />;

      case DataType.VPN:
        return <VpnData value={dataNode.data as any} />;

      case DataType.CONTAINER_PHARMACY:
        return <ContainerPharmacyData value={dataNode.data as any} />;

      default:
        return <></>;
    }
  };

  return (
    <Box
      sx={{
        textAlign: 'center',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '50px',
      }}
    >
      {renderData()}
    </Box>
  );
}
