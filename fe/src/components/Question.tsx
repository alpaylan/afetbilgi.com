import {
  Autocomplete,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { jsx } from '@emotion/react';
import { useQuestionData } from '../hooks';
import { Category, TreeNodeType } from '../variables/TreeNode';
import Data from './Data';
import UsefulLinksData from './data/UsefulLinksdata';
import JSX = jsx.JSX;
import { OptionNode, QuestionNode } from '../interfaces/TreeNode';
import { getCategoryOfTreeNode } from '../utils/category';



const getOptionName = (option: any, lang: string) =>
  option[`name_${lang}`] || option.name_tr || option.name;

const getAutocompleteName = (option: any, lang: string) =>
  option[`autocompleteHint_${lang}`] ||
  option.autocompleteHint_tr ||
  option.autocompleteHint;

export default function Question({ paths }: { paths: string[] }) {
  const isMinWidth = useMediaQuery('(max-width:1078px)');
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const { data: selectedNode, isLoading } = useQuestionData(paths);

  if (isLoading) {
    return <></>;
  }

  if (!selectedNode) {
    return <Box>
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h4'>
          {t('notFound')}
        </Typography>
      </Box>
    </Box>;
  }

  if (selectedNode.type !== TreeNodeType.NODE_TYPE_QUESTION) {
    return <Data dataNode={selectedNode as any} />;
  }

  const isRootQuestion = location.pathname === '/';

  const renderOptionButton = (option: OptionNode) => (
    <Button
      key={`button-${getOptionName(option, i18n.language)}`}
      variant='contained'
      size='medium'
      sx={{ m: 2, minWidth: '300px' }}
      onClick={() => {
        if (isRootQuestion) {
          const optionName = encodeURIComponent(getOptionName(option, 'tr'));
          if (optionName === 'K%C4%B1z%C4%B1lay%20Kan%20Ba%C4%9F%C4%B1%C5%9F%20Noktalar%C4%B1') {
            window.location.href = 'https://www.kanver.org/KanHizmetleri/KanBagisiNoktalari';
          } else {
            navigate(`/${optionName}`);
          }
        } else {
          navigate(
            `${location.pathname}/${encodeURIComponent(
              getOptionName(option, 'tr'),
            )}`,
          );
        }
      }}
    >
      {getOptionName(option, i18n.language).toLocaleUpperCase(i18n.language)}
    </Button>
  );

  const renderOptions = () => {
    if (isRootQuestion) {
      const buttonsByCategories: {
        [key in Category as string]: JSX.Element[];
      } = {
        [Category.VICTIM]: [],
        [Category.HEALTH]: [],
        [Category.HELPER]: [],
        [Category.RESOURCES]: [],
        [Category.OTHER]: [],
      };

      (selectedNode as QuestionNode).options.forEach((option) => {
        buttonsByCategories[getCategoryOfTreeNode(option.value)].push(
          renderOptionButton(option),
        );
      });

      const dividerPos = isMinWidth ? [0,2] : [0,1];

      return Object.keys(buttonsByCategories)
        .filter((category) => buttonsByCategories[category].length > 0)
        .map((category, i) => (
          <>
            <Box
              sx={{
                textAlign: 'center',
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'center',
                paddingTop: '50px',
              }}
            >
              <Typography variant='h5'>
                {t(`category.${category}.name`)}
              </Typography>
              {buttonsByCategories[category]}
            </Box>
            {dividerPos.includes(i) && (
              <Divider orientation='vertical' flexItem sx={{ m: 2, mt: 5, display: { xs: 'none', md: 'block' }, borderRightWidth: 2 }} />
            )}
          </>
        ));
    }
    return getAutocompleteName(selectedNode, i18n.language) ? (
      <Autocomplete
        id='options-autocomplete'
        renderInput={(params) => (
          <TextField
            {...params}
            label={getAutocompleteName(selectedNode, i18n.language)}
            variant='outlined'
            sx={{ minWidth: '200px', m: 2 }}
          />
        )}
        options={selectedNode.options}
        getOptionLabel={(option: any) => getOptionName(option, i18n.language)}
        onChange={(_, selectedOption: any) => {
          if (!selectedOption) {
            return;
          }

          if (isRootQuestion) {
            navigate(
              `/${encodeURIComponent(getOptionName(selectedOption, 'tr'))}`,
            );
          } else {
            navigate(
              `${location.pathname}/${encodeURIComponent(
                getOptionName(selectedOption, 'tr'),
              )}`,
            );
          }
        }}
      />
    ) : (
      selectedNode.options.map((option: any) =>
        renderOptionButton(option as OptionNode),
      )
    );
  };

  return (
    <Box>
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h4'>
          {selectedNode[`text_${i18n.language}`] || selectedNode.text}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'start',
            justifyContent: 'center',
            paddingBottom: '50px',
          }}
        >
          {renderOptions()}
          {selectedNode.externalData?.usefulLinks?.length > 0 && (
              <Box width='100%' mt={8}>
                <Typography variant='h4'>
                  {selectedNode.externalData[`text_${i18n.language}`] ||
                    selectedNode.externalData.text}
                </Typography>
                <UsefulLinksData value={selectedNode.externalData} noTitle />
              </Box>
            )}
        </Box>
      </Box>
    </Box>
  );
}
