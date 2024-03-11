import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertCustum({open,setOpen,text,state=0}) {


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} 
      anchorOrigin={{ vertical:'top', horizontal:'center' }}
      >
        {
            state==0?<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {text}
           </Alert>
           :
           <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
           {text}
          </Alert>
        }
       
      </Snackbar>
    </Stack>
  );
}