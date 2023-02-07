import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuestionData } from '../hooks';
import { TreeNodeType } from '../variables/TreeNode';
import Data from './Data';

const getOptionName = (option: any, lang: string) => option[`name_${lang}`] || option.name_tr || option.name;

export default function Question({ lang, paths }: { lang: string, paths: string[] }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: selectedNode, isLoading } = useQuestionData(lang, paths);

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
        <Typography variant='h4'>{selectedNode[`text_${lang}`] || selectedNode.text}</Typography>

        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'center',
            paddingBottom: '50px',
          }}
        >
          {selectedNode.autocompleteHint ? (
            <Autocomplete
              id='options-autocomplete'
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={selectedNode.autocompleteHint}
                  variant='outlined'
                  sx={{ minWidth: '200px', m: 2 }}
                />
              )}
              options={selectedNode.options}
              getOptionLabel={(option: any) => getOptionName(option, lang)}
              onChange={(_, selectedOption: any) => {
                if (!selectedOption) {
                  return;
                }

                if (location.pathname === '/') {
                  navigate(`/${encodeURIComponent(getOptionName(selectedOption, 'tr'))}`);
                } else {
                  navigate(
                    `${location.pathname}/${encodeURIComponent(
                      getOptionName(selectedOption, 'tr')
                    )}`,
                  );
                }
              }}
            />
          ) : (
            selectedNode.options.map((option: any) => (
              <Button
                key={`button-${getOptionName(option, lang)}`}
                variant='contained'
                size='medium'
                sx={{ m: 2, minWidth: '300px' }}
                onClick={() => {
                  if (location.pathname === '/') {
                    navigate(`/${encodeURIComponent(getOptionName(option, 'tr'))}`);
                  } else {
                    navigate(
                      `${location.pathname}/${encodeURIComponent(getOptionName(option, 'tr'))}`,
                    );
                  }
                }}
              >
                {getOptionName(option, lang).toLocaleUpperCase(lang)}
              </Button>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}
