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

export interface ItemDataNode extends DataNode {
  items: string[];
}

export interface URLDataNode extends DataNode {
  url: string;
}


export interface BankDataNode extends DataNode {
  accounts: {
    name: string;
    branch: string;
    tl: string;
    eur?: string;
    usd?: string;
    gbp?: string;
    swift?: string;
  }[];
}

export interface CityBarinmaNode extends DataNode {
  items: {
    name: string;
    url: string;
  }[];
}
