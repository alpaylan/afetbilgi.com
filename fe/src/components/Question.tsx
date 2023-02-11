import React, { useEffect } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { jsx } from '@emotion/react';

import { useQuestionData } from '../hooks';
import { Category, TreeNodeType } from '../variables/TreeNode';
import Data from './Data';
import UsefulLinksData from './data/UsefulLinksdata';
import { OptionNode, QuestionNode } from '../interfaces/TreeNode';
import { getCategoryOfTreeNode } from '../utils/category';

import JSX = jsx.JSX;

const getOptionName = (option: any, lang: string) =>
  option[`name_${lang}`] || option.name_tr || option.name;

const getAutocompleteName = (option: any, lang: string) =>
  option[`autocompleteHint_${lang}`] ||
  option.autocompleteHint_tr ||
  option.autocompleteHint;

export default function Question({ paths }: { paths: string[] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const { data: selectedNode, isLoading } = useQuestionData(paths);

  if (isLoading) {
    return <></>;
  }

  if (!selectedNode) {
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
          <Typography variant='h4'>{t('notFound')}</Typography>
        </Box>
      </Box>
    );
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
          if (
            optionName ===
            'K%C4%B1z%C4%B1lay%20Kan%20Ba%C4%9F%C4%B1%C5%9F%20Noktalar%C4%B1'
          ) {
            window.open(
              'https://www.kanver.org/KanHizmetleri/KanBagisiNoktalari',
              '_blank',
            );

          } else if (
            optionName === "Mobil%20Tuvaletler"
          ) {
            window.open(
              'https://twitter.com/SabanciVakfi/status/1624442911554211842?cxt=HHwWhMC40ZWOl4stAAAA',
              '_blank',
              );

          }
          
          
          else {
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

      return (
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent='center'
          alignItems='center'
          divider={<Divider orientation='vertical' flexItem sx={{ mt: 5 }} />}
          sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'start',
            justifyContent: 'center',
            paddingTop: '50px',
          }}
        >
          {Object.keys(buttonsByCategories)
            .filter((category) => buttonsByCategories[category].length > 0)
            .map((category) => (
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
            ))}
        </Stack>
      );
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
