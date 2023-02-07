/* eslint-disable no-restricted-syntax */

import { Box, Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import {useQuestionData } from '../hooks';
import { TreeNodeType } from '../variables/TreeNode';
import Data from './Data';

export default function Question({ paths }: { paths: string[] }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: selectedNode, isLoading } = useQuestionData(paths);

  if (isLoading || !selectedNode) {
    return <></>;
  }

  return selectedNode.type !== TreeNodeType.NODE_TYPE_QUESTION ? (
    <Data dataNode={(selectedNode as any)} />
  ) : (
    <Box>
      <Box sx={{ textAlign: 'center', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center' }}>
        <Typography variant="h4">
          {selectedNode.text}
        </Typography>

        <Box sx={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center', paddingBottom: '50px' }}>
          {selectedNode.options.map((option: any) => (
            <Button
              key={`button-${option.name}`}
              variant="contained"
              size="medium"
              sx={{ m: 2, minWidth: '300px' }}
              onClick={() => {
                if (location.pathname === '/') {
                  navigate(`/${encodeURIComponent(option.name)}`);
                } else {
                  navigate(`${location.pathname}/${encodeURIComponent(option.name)}`);
                }
              }}
            >
              {option.name}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
