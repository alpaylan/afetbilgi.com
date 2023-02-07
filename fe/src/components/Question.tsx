import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { DataNode, QuestionNode, TreeNode } from '../interfaces/TreeNode';
import { TreeNodeType } from '../variables/TreeNode';
import Data from './Data';

interface QuestionProps {
  questionNode: QuestionNode;
  onBack?: () => void;
}

export default function Question(props: QuestionProps) {
  const [answer, setAnswer] = useState<TreeNode | undefined>(undefined);

  const renderAnswer = () => {
    if (!answer) {
      return <></>;
    }

    if (answer.type === TreeNodeType.NODE_TYPE_QUESTION) {
      return (
        <Question
          questionNode={answer as QuestionNode}
          onBack={() => setAnswer(undefined)}
        />
      );
    }

    return (
      <Data dataNode={answer as DataNode} onBack={() => setAnswer(undefined)} />
    );
  };

  return answer ? (
    renderAnswer()
  ) : (
    <Box sx={{ height: '100%' }}>
      {props.onBack && (
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button size="large" onClick={props.onBack}>
            Geri
          </Button>
        </Box>
      )}

      <Box sx={{ textAlign: 'center', height: '80%', display: 'flex', flexFlow: 'column nowrap', justifyContent: 'center' }}>
        <Typography variant="h2">
          {props.questionNode.text}
        </Typography>

        <Box sx={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'center' }}>
          {props.questionNode.options.map((option) => (
            <Button
              variant="contained"
              size="large"
              sx={{ m: 2 }}
              onClick={() => setAnswer(option.value)}
            >
              {option.name}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
