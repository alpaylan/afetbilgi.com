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

export interface CreditCardNode extends DataNode {
    name: string;
    url: string;
}

export interface GatheringDataNode extends DataNode {
  city: string;
  items: string[];
}

export interface HelpItemNode extends DataNode {
  city: string;
  items: {
    name: string;
    location?: string;
    url: string;
    phone_number: string;
  }[];
}

export interface URLDataNode extends DataNode {
  name: string;
  short_description?: string;
  url: string;
}

export interface SMSDataNode extends DataNode {
  name: string;
  sms: string;
  number: string;
  amount: string;
}

export interface BloodDonationNode extends DataNode {
  city: string;
  name?: string;
  head?: string;
  address?: string;
  phone_number?: string;
  cell_phone_number?: string;
  fax?: string;
  url?: string;
}
