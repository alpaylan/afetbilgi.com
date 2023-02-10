export interface TreeNode {
  type: string;
}

export interface QuestionNode extends TreeNode {
  text: string;
  options: OptionNode[];
}

export interface DataNode extends TreeNode {
  data: DataValue;
}

export interface DataValue {
  dataType: string;
}

export interface OptionNode {
  name: string;
  value: TreeNode;
}

export interface Article {
  title: string;
  author: string;
  url: string;
}

export interface ArticleDataNode extends DataNode {
  articles: Article[];
}

export interface BankDataNode extends DataNode {
  accounts: {
    name: string;
    branch: string;
    ownerName?: string;
    tl: string;
    eur?: string;
    usd?: string;
    gbp?: string;
    swift?: string;
    bep?: string;
    erc?: string;
    avalanche?: string;
    url?: string;
  }[];
}

export interface BloodDonationNode extends DataNode {
  items: {
    city: string;
    name?: string;
    head?: string;
    address?: string;
    phone_number?: string;
    cell_phone_number?: string;
    fax?: string;
    url?: string;
  }[];
}

export interface CityAccommodationNode extends DataNode {
  city: string;
  items: {
    name: string;
    phone_number?: string;
    url: string;
    address?: string;
    is_validated: boolean;
  }[];
}

export interface Vet {
  name: string;
  phone_number: string;
  address: string;
  maps_url: string;
}

export interface VetNode extends DataNode {
  city: string;
  vets: Vet[];
}

export interface CreditCardNode extends DataNode {
  name: string;
  url: string;
}

export interface GatheringDataNode extends DataNode {
  city: string;
  items: {
    name: string;
    url: string;
    source: string;
  }[];
}

export interface HelpItem {
  name: string;
  location?: string;
  url: string;
  phone_number: string;
}

export interface HelpItemNode extends DataNode {
  city: string;
  items: HelpItem[];
}

export interface Phone {
  name: string;
  phone_number: string;
  is_plain: boolean;
}

export interface SMSDataNode extends DataNode {
  name: string;
  sms: string;
  number: string;
  amount: string;
}

export interface TelephoneDataNode extends DataNode {
  phones: Phone[];
}

export interface URLDataNode extends DataNode {
  name: string;
  short_description?: string;
  url: string;
}

export interface UsefulLink {
  name: string;
  url: string;
}

export interface UsefulLinksDataNode extends DataNode {
  usefulLinks: UsefulLink[];
}

export interface StemCellDataNode extends DataNode {
  items: StemCellDataItem[];
}

export interface StemCellDataItem {
  area: string;
  city: string;
  address: string;
  phone: string;
}

export interface FoodDistribution {
  name: string;
  maps_url?: string;
  url?: string;
  phone_number?: string;
  updated_at_date: string;
  updated_at_time: string;
}
export interface FoodDistributionDataNode extends DataNode {
  city: string;
  county: string;
  items: FoodDistribution[];
}

export interface VpnDataNode extends DataNode {
  items: {
    name: string;
    url: string;
  }[];
}

export interface ContainerPharmacy {
  city: string;
  district: string;
  location: string;
  locationLink: string;
}
export interface ContainerPharmacyDataNode extends DataNode {
  items: ContainerPharmacy[];
}

export interface EvacuationDataNode extends DataNode {
  items: {
    city: string;
    county: string;
    name: string;
    map_link: string;
    address: string;
    contacts: string[];
    validator: string;
  }[];
}

export interface DonationLinksDataNode extends DataNode {
  items: {
    name: string;
    url: string;
  }[];
}