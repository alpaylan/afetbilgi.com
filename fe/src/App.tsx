import * as React from 'react';

import './App.css';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'material-react-toastify';

import { QuestionNode } from './interfaces/TreeNode';
import { getData } from './services/data';
import Waiting from './components/Waiting';
import Question from './components/Question';

const App = () => {
  const [rootQuestion, setRootQuestion] = useState<QuestionNode | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getData()
      .then((data) => setRootQuestion(data))
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box component='div'>
      <Waiting open={loading} />
      {rootQuestion && <Question questionNode={rootQuestion} />}
    </Box>
  );
};

export default App;
