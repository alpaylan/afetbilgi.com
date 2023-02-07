/* eslint-disable no-restricted-syntax */

import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuestionData } from '../hooks';
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
        const intPath = Number(path);

        if (currNode.type !== TreeNodeType.NODE_TYPE_QUESTION) {
          return;
        }

        currNode = currNode.options[intPath].value;
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
    <Box sx={{ height: '100%' }}>
      {location.pathname !== '/' && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button size="large" onClick={() => navigate(-1)}>
            Geri
          </Button>
        </Box>
      )}

      <Box sx={{ textAlign: 'center', height: '80%', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center' }}>
        <Typography variant="h2">
          {selectedNode.text}
        </Typography>

        <Box sx={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center' }}>
          {selectedNode.options.map((option, i) => (
            <Button
              key={`button-${i}`}
              variant="contained"
              size="large"
              sx={{ m: 2 }}
              onClick={() => {
                if (location.pathname === '/') {
                  navigate(`/${i}`);
                } else {
                  navigate(`${location.pathname}/${i}`);
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
