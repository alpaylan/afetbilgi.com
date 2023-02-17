import { CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import React from 'react';

export default function Waiting({ open }: { open: boolean }) {
  return (
    <Backdrop open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
