import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({open,setOpen,title,text}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Тут може бути інформація умови доставки і тому подібне {title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          тут текст повідомлення {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{color:"black"}} onClick={handleClose}>Закрити</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
