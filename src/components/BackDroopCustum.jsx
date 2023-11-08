import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useStore } from '../store';

export default function BackDroopCustum() {
  const flag=useStore(state=>state.flag)
  const setFlag=useStore(state=>state.setFlag)
  const handleClose = () => {
    setFlag(false);
  };
  const handleOpen = () => {
    setFlag(true);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Show backdrop</Button>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={flag}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}