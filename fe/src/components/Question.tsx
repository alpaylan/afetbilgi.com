/* eslint-disable no-restricted-syntax */

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
import { OptionNode } from '../interfaces/TreeNode';

export default function Question({ lang, paths }: { lang?: string, paths: string[] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const language = lang === 'en' ? 'EN' : 'TR';

  const { data: selectedNode, isLoading } = useQuestionData(lang, paths);

  if (isLoading || !selectedNode) {
    return <></>;
  }

  return selectedNode.type !== TreeNodeType.NODE_TYPE_QUESTION ? (
    <Data dataNode={selectedNode as any} />
  ) : (
    <Box>
      <Box
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h4'>{selectedNode.text}</Typography>

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
              getOptionLabel={(option: OptionNode) => option.name}
              onChange={(_, selectedOption) => {
                if (!selectedOption) {
                  return;
                }

                if (location.pathname === '/') {
                  navigate(`/${encodeURIComponent(selectedOption.name)}`);
                } else {
                  navigate(
                    `${location.pathname}/${encodeURIComponent(
                      selectedOption.name,
                    )}`,
                  );
                }
              }}
            />
          ) : (
            selectedNode.options.map((option: any) => (
              <Button
                key={`button-${option.name}`}
                variant='contained'
                size='medium'
                sx={{ m: 2, minWidth: '300px' }}
                onClick={() => {
                  if (location.pathname === '/') {
                    navigate(`/${encodeURIComponent(option.name)}`);
                  } else {
                    navigate(
                      `${location.pathname}/${encodeURIComponent(option.name)}`,
                    );
                  }
                }}
              >
                {option.name.toLocaleUpperCase(language)}
              </Button>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}
