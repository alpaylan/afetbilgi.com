import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import ArticleIcon from '@mui/icons-material/Article';
import CategoryIcon from '@mui/icons-material/Category';
import HttpIcon from '@mui/icons-material/Http';
import StorageIcon from '@mui/icons-material/Storage';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import WebhookIcon from '@mui/icons-material/Webhook';
import { isEmpty } from 'lodash';
import {
  NewOutputDialogState,
  NewOutputDialogStep,
  OutputIconProps,
  OutputKind,
} from '../../interfaces/Output/Output';
import { getDefaultNewPage } from './Page';

export const getOutputIcon = (
  kind: OutputKind,
  iconProps: OutputIconProps,
): JSX.Element => {
  switch (kind) {
    case OutputKind.API_ENDPOINT:
      return <HttpIcon {...iconProps} />;
    case OutputKind.PAGE:
      return <ArticleIcon {...iconProps} />;
    case OutputKind.SQL_DATABASE:
      return <StorageIcon {...iconProps} />;
    case OutputKind.NOSQL_DATABASE:
      return <WarehouseIcon {...iconProps} />;
    case OutputKind.GOOGLE_SHEETS:
      return <AddToDriveIcon {...iconProps} />;
    case OutputKind.WEBHOOK:
      return <WebhookIcon {...iconProps} />;
    default:
      return <CategoryIcon {...iconProps} />;
  }
};

export const getDefaultNewOutputDialogState = (): NewOutputDialogState => ({
  step: NewOutputDialogStep.SELECT_TYPE,
  kind: OutputKind.PAGE,
  page: getDefaultNewPage(),
});

export const validateNewPage = (currentState: NewOutputDialogState) => {
  if (!currentState.page.table) {
    return false;
  }

  if (currentState.page.name.trim().length === 0) {
    return false;
  }

  if (
    currentState.page.questions.filter(
      (question) => question.text.trim().length === 0,
    ).length > 0
  ) {
    return false;
  }

  return !isEmpty(currentState.page.leafs);
};
