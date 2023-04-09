export enum ColumnType {
  TEXT = 'text',
  LINK = 'link',
  PHONE_NUMBER = 'phone_number',
  BOOLEAN = 'boolean',
}

export interface ColumnDefinition {
  name: string;
  type: ColumnType;
}

export interface TableDefinition {
  name: string;
  columns: ColumnDefinition[];
  lastUpdatedBy: string;
  lastUpdatedAt: Date;
}
