import { FC } from 'react';
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
import EvacuationData from './data/EvacuationData';
import DonationLinksData from './data/DonationLinksData';

const pageMappings: Record<string, FC<{value: any}>> = {
  [DataType.BANK_ACCOUNT_DONATION]: BankData,
  [DataType.BENEFICIAL_ARTICLES]: ArticleData,
  [DataType.BLOOD_DONATION_LIST]: BloodDonationData,
  [DataType.CITY_ACCOMMODATION]: CityAccommodation,
  [DataType.CREDIT_CARD_DONATION]: CreditCardData,
  [DataType.INTERNATIONAL_BANK_ACCOUNT_DONATION]: BankData,
  [DataType.INTERNATIONAL_URL_DONATION]: URLData,
  [DataType.NEW_GATHERING_LIST]: GatheringData,
  [DataType.HELP_ITEM_LIST]: HelpItemData,
  [DataType.PHONE_NUMBER_LIST]: TelephoneData,
  [DataType.SMS_DONATION]: SMSData,
  [DataType.URL_DONATION]: URLData,
  [DataType.USEFUL_LINKS]: UsefulLinksData,
  [DataType.STEM_CELL_DONATION]: StemCellData,
  [DataType.DATA_VET]: VetData,
  [DataType.FOOD_ITEMS]: FoodDistributionData,
  [DataType.VPN]: VpnData,
  [DataType.CONTAINER_PHARMACY]: ContainerPharmacyData,
  [DataType.EVACUATION_POINTS]: EvacuationData,
  [DataType.DONATION_LINKS]: DonationLinksData,
}

export default function Data({ dataNode }: { dataNode: DataNode }) {
  const renderData = () => {
    const Page = pageMappings[dataNode.data.dataType];

    return Page ? <Page value={dataNode.data} /> : <>Not found</>;
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
