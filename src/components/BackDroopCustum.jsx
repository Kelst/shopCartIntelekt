import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useStore } from '../store';

export default function BackDroopCustum() {
  const loader=useStore(state=>state.loader)
  const setLoader=useStore(state=>state.setLoader)


  return (
    <div>
      
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
   
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}