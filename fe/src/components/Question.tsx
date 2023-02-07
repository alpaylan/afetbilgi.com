import { Box, Button, Grid, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { useState } from 'react';
import { DataNode, QuestionNode, TreeNode } from '../interfaces/TreeNode';
import { useSharedStyles } from '../utilities/Styles';
import { multiClass } from '../utilities/Extensions';
import { TreeNodeType } from '../variables/TreeNode';
import Data from './Data';

interface QuestionProps {
  questionNode: QuestionNode;
  onBack?: () => void;
}

const Question = (props: QuestionProps) => {
  const { classes } = useStyles();
  const sharedClasses = useSharedStyles().classes;

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
    <Box component='div' className={classes.mainWrapper}>
      {props.onBack && (
        <Box component='div' className={classes.horizontalCenter}>
          <Button onClick={props.onBack} className={sharedClasses.buttonText}>
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
          <Typography className={multiClass([sharedClasses.h3, classes.text])}>
            {props.questionNode.text}
          </Typography>
        </Grid>
        {props.questionNode.options.map((option) => (
          <Grid item xs={4}>
            <Button
              variant='contained'
              onClick={() => setAnswer(option.value)}
              className={sharedClasses.buttonText}
            >
              {option.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles()((theme) => ({
  mainWrapper: {
    flexGrow: 1,
    flexDirection: 'column',
    padding: theme.spacing(1.5),
  },
  horizontalCenter: {
    flexGrow: 1,
    textAlign: 'center',
  },
  text: {
    marginBottom: theme.spacing(1),
  },
}));

export default Question;
