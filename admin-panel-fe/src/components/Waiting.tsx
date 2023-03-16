import { CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import React from 'react';

const Waiting = (props: { open: boolean }) => {
  return (
    <Backdrop sx={{ zIndex: 500, color: '#fff' }} open={props.open}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
};

export default Waiting;
