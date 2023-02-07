/* eslint-disable no-restricted-syntax */

import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMobile, useQuestionData } from '../hooks';
import { QuestionNode } from '../interfaces/TreeNode';
import { TreeNodeType } from '../variables/TreeNode';
import Data from './Data';

export default function Question({ paths }: { paths: string[] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMobile();

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

        currNode = currNode.options[intPath].value as any;
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
        <Typography variant={isMobile ? "h4": "h2"}>
          {selectedNode.text}
        </Typography>

        <Box sx={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
          {selectedNode.options.map((option, i) => (
            <Button
              key={`button-${i}`}
              variant="contained"
              size="large"
              sx={{ m: 2, minWidth: '120px' }}
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
