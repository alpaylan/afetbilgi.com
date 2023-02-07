/* eslint-disable no-restricted-syntax */

import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {useQuestionData } from '../hooks';
import { QuestionNode } from '../interfaces/TreeNode';
import { TreeNodeType } from '../variables/TreeNode';
import Data from './Data';

export default function Question({ paths }: { paths: string[] }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: questionData } = useQuestionData();

  const [selectedNode, setSelectedNode] = useState<QuestionNode | null>(null);

  useEffect(() => {
    if (questionData) {
      let currNode = questionData;

      for (const path of paths) {
        if (currNode.type !== TreeNodeType.NODE_TYPE_QUESTION) {
          return;
        }

        const decodedPath = decodeURIComponent(path);

        currNode = currNode.options.find(o => o.name === decodedPath)?.value as any;
      }

      setSelectedNode(currNode);
    } else {
      setSelectedNode(null);
    }
  }, [questionData, paths]);

  if (!selectedNode) {
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
          {selectedNode.options.map((option) => (
            <Button
              key={`button-${option.name}`}
              variant="contained"
              size="medium"
              sx={{ m: 2, minWidth: '300px' }}
              onClick={() => {
                if (location.pathname === '/') {
                  navigate(`/${option.name}`);
                } else {
                  navigate(`${location.pathname}/${option.name}`);
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
