import React, { useEffect } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  Link as MUILink,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { jsx } from '@emotion/react';

import { useQuestionData } from '../hooks';
import { Category, TreeNodeType } from '../variables/TreeNode';
import Data from './Data';
import UsefulLinksData from './data/UsefulLinksdata';
import { OptionNode, QuestionNode } from '../interfaces/TreeNode';
import { getCategoryOfTreeNode } from '../utils/category';

import JSX = jsx.JSX;

const checkCityHasData = ( option : OptionNode, selectedCity : string ) => {
  const node = option as any;
  const existingCities = node.value.options as any[];
  return existingCities.some(item => item?.name === selectedCity || item?.name_tr === selectedCity);
}

const getOptionName = (option: any, lang: string) =>
  option[`name_${lang}`] || option.name_tr || option.name;

const getAutocompleteName = (option: any, lang: string) =>
  option[`autocompleteHint_${lang}`] ||
  option.autocompleteHint_tr ||
  option.autocompleteHint;

export default function Question({ paths, selectedCity }: { paths: string[], selectedCity: string | null }) {
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


  if (!selectedNode && !selectedCity) {
    return (
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
    );
  }

  if (selectedNode.type !== TreeNodeType.NODE_TYPE_QUESTION) {
    return <Data dataNode={selectedNode as any} />;
  }



  const isRootQuestion = location.pathname === '/' || selectedCity;
  const renderOptionButton = (option: OptionNode) => {
    const optionNameLocalized = getOptionName(option, i18n.language);
    const optionName = encodeURIComponent(getOptionName(option, 'tr'));
    const directLinks:Record<string,string> = {
      'K%C4%B1z%C4%B1lay%20Kan%20Ba%C4%9F%C4%B1%C5%9F%20Noktalar%C4%B1': 'https://www.kanver.org/KanHizmetleri/KanBagisiNoktalari',
      "Mobil%20Tuvaletler": 'https://twitter.com/sabancivakfi/status/1625146826335694849?s=46&t=XcGyniD8_Ur8EiwgP61Gqg'
    };
    
    const isDirectLink = optionName in directLinks && isRootQuestion;
    let redirectionPath;
    if(selectedCity && option.value.type === 'question') {
      // if the data city specific
      if ( !checkCityHasData(option, selectedCity) ) {
         return(<></>);
      }
      redirectionPath = isRootQuestion?`/${optionName}/${selectedCity}`:`${location.pathname}/${optionName}`;
    } else {
      // if the data general for all cities
      redirectionPath = isRootQuestion?`/${optionName}`:`${location.pathname}/${optionName}`;
    }
    if(isDirectLink) redirectionPath = directLinks[optionName];

    // Direct link buttons have underlines
    if (isDirectLink) {
      return (
        <MUILink underline='always'>
          <Button
            key={`button-${optionNameLocalized}`}
            variant='contained'
            size='medium'
            sx={{ m: 2, minWidth: '300px' }}
            href={redirectionPath}
            target='_blank'
            endIcon={<OpenInNewIcon />}
          >
            {optionNameLocalized.toLocaleUpperCase(i18n.language)}
          </Button>
        </MUILink>
      );
    }

    return (
      <Button
        key={`button-${optionNameLocalized}`}
        variant='contained'
        size='medium'
        sx={{ m: 2, minWidth: '300px' }}
        to={redirectionPath}
        component= {Link}
        endIcon={isDirectLink && <OpenInNewIcon />}
      >
        {optionNameLocalized.toLocaleUpperCase(i18n.language)}
      </Button>
    );
  };

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
          divider={<Divider orientation='vertical' flexItem />}
          sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'start',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          {Object.keys(buttonsByCategories)
            .filter((category) => buttonsByCategories[category].length > 0)
            .map((category, i) => (
              <Box
                key={i}
                sx={{
                  textAlign: 'center',
                  display: 'flex',
                  flexFlow: 'column nowrap',
                  justifyContent: 'center',
                  mb: 2
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
        sx={{ m: 2 }}
        id='options-autocomplete'
        renderInput={(params) => (
          <TextField
            {...params}
            label={getAutocompleteName(selectedNode, i18n.language)}
            variant='outlined'
            sx={{ minWidth: '240px' }}
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
    <>
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h5'>
          {selectedCity && isRootQuestion ?
          t('page.main.subtitle_city', {city: selectedCity})
        : selectedNode[`text_${i18n.language}`] || selectedNode.text
        }
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'start',
            justifyContent: 'center',
            mt: 2
          }}
        >
          {renderOptions()}
          {selectedNode.externalData?.usefulLinks?.length > 0 && (
            <Box width='100%' mt={2}>
              <Typography variant='h5' sx={{ mb: 2 }}>
                {selectedNode.externalData[`text_${i18n.language}`] ||
                  selectedNode.externalData.text}
              </Typography>
              <UsefulLinksData value={selectedNode.externalData} noTitle />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
