import { NewPage } from './Page';

export enum OutputKind {
  PAGE = 'page',
  API_ENDPOINT = 'api_endpoint',
  SQL_DATABASE = 'sql_database',
  NOSQL_DATABASE = 'nosql_database',
  GOOGLE_SHEETS = 'google_sheets',
  WEBHOOK = 'webhook',
}

export enum NewOutputDialogStep {
  SELECT_TYPE = 'select_type',

  SET_PAGE = 'set_page',
}

export interface OutputIconProps {
  fontSize: 'large' | 'medium' | 'small';
  sx: { color: string };
}

export interface NewOutputDialogState {
  step: NewOutputDialogStep;
  kind: OutputKind;
  page: NewPage;
}

export interface OutputSummary {
  id: string;
  name: string;
  table: string;
  kind: OutputKind;
  isActive: boolean;
  lastUpdatedBy: string;
  lastUpdatedAt: Date;
}
