import React from 'react';
import { makeStyles } from 'tss-react/mui';
import { CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';

export default function Waiting(props: { open: boolean }) {
  const useStyle = makeStyles()((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

  const { classes } = useStyle();

  return (
    <Backdrop className={classes.backdrop} open={props.open}>
      <CircularProgress color='inherit' />
    </Backdrop>
  );
}
