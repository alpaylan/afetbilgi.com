import { Box, Button, Grid, Typography } from '@mui/material';
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
    <Box component='div'>
      {props.onBack && (
        <Box component='div'>
          <Button onClick={props.onBack}>
            Geri
          </Button>
        </Box>
      )}

      <Grid
        container
        spacing={0.75}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={4}>
          <Typography>
            {props.questionNode.text}
          </Typography>
        </Grid>

        {props.questionNode.options.map((option) => (
          <Grid item xs={4}>
            <Button
              variant='contained'
              onClick={() => setAnswer(option.value)}
            >
              {option.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
