import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useQuestionData } from '../hooks';
import { TreeNodeType } from '../variables/TreeNode';
import Data from './Data';
import UsefulLinksData from './data/UsefulLinksdata';

const getOptionName = (option: any, lang: string) =>
  option[`name_${lang}`] || option.name_tr || option.name;

const getAutocompleteName = (option: any, lang: string) =>
    option[`autocompleteHint_${lang}`] || option.autocompleteHint_tr || option.autocompleteHint;


export default function Question({ paths }: { paths: string[] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const { data: selectedNode, isLoading } = useQuestionData(paths);

  if (isLoading || !selectedNode) {
    return <></>;
  }

  if (selectedNode.type !== TreeNodeType.NODE_TYPE_QUESTION) {
    return <Data dataNode={selectedNode as any} />;
  }

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
            justifyContent: 'center',
            paddingBottom: '50px',
          }}
        >
          {getAutocompleteName(selectedNode, i18n.language) ? (
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
              getOptionLabel={(option: any) =>
                getOptionName(option, i18n.language)
              }
              onChange={(_, selectedOption: any) => {
                if (!selectedOption) {
                  return;
                }

                if (location.pathname === '/') {
                  navigate(
                    `/${encodeURIComponent(
                      getOptionName(selectedOption, 'tr'),
                    )}`,
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
            selectedNode.options.map((option: any) => (
              <Button
                key={`button-${getOptionName(option, i18n.language)}`}
                variant='contained'
                size='medium'
                sx={{ m: 2, minWidth: '300px' }}
                onClick={() => {
                  if (location.pathname === '/') {
                    navigate(
                      `/${encodeURIComponent(getOptionName(option, 'tr'))}`,
                    );
                  } else {
                    navigate(
                      `${location.pathname}/${encodeURIComponent(
                        getOptionName(option, 'tr'),
                      )}`,
                    );
                  }
                }}
              >
                {getOptionName(option, i18n.language).toLocaleUpperCase(
                  i18n.language,
                )}
              </Button>
            ))
          )}
          {selectedNode.externalData &&
            selectedNode.externalData.usefulLinks?.length > 0 && (
              <Box width='100%' mt={8}>
                <Typography variant='h4'>
                  {selectedNode.externalData?.[`text_${i18n.language}`] ||
                    selectedNode.externalData?.text}
                </Typography>
                <UsefulLinksData value={selectedNode.externalData} noTitle />
              </Box>
            )}
        </Box>
      </Box>
    </Box>
  );
}
