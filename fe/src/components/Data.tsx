import { Box } from '@mui/material';
import { FC } from 'react';

import { DataNode } from '../interfaces/TreeNode';
import { DataType } from '../variables/TreeNode';
import ArticleData from './data/ArticleData';
import BankData from './data/BankData';
import BloodDonationData from './data/BloodDonationData';
import CityAccommodation from './data/CityAccommodation';
import ContainerPharmacyData from './data/ContainerPharmacyData';
import CreditCardData from './data/CreditCardData';
import DigitalPlatformData from './data/DigitalPlatformData';
import DonationLinksData from './data/DonationLinksData';
import EmergencyGatheringData from './data/EmergencyGathering';
import EvacuationData from './data/EvacuationData';
import FoodDistributionData from './data/FoodDistributionData';
import GasStationsData from './data/GasStationsData';
import GatheringData from './data/GatheringData';
import HelpItemData from './data/HelpItemData';
import PharmacyData from './data/PharmacyData';
import TelephoneData from './data/PhoneData';
import SahraData from './data/SahraData';
import ServicesData from './data/ServicesData';
import SMSData from './data/SMSData';
import StemCellData from './data/StemCellData';
import ToiletsData from './data/ToiletsData';
import TransportationsData from './data/TransportationsData';
import URLData from './data/URLData';
import UsefulLinksData from './data/UsefulLinksdata';
import VetData from './data/VetData';
import VpnData from './data/VpnData';

const pageMappings: Record<string, FC<{ value: any }>> = {
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
  [DataType.TRANSPORTATIONS]: TransportationsData,
  [DataType.HEALTHCARE_SERVICES]: SahraData,
  [DataType.GAS_STATION]: GasStationsData,
  [DataType.MOBILE_TOILETS]: ToiletsData,
  [DataType.PHARMACY]: PharmacyData,
  [DataType.DIGITAL_PLATFORMS]: DigitalPlatformData,
  [DataType.SERVICES]: ServicesData,
  [DataType.EMERGENCY_GATHERING]: EmergencyGatheringData,
};

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
      }}
    >
      {renderData()}
    </Box>
  );
}
