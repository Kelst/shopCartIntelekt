import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TextField from '@mui/material/TextField';
import AlertCustum from './AlertCustum';
import { useStore } from '../store';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CallDialog({open,setOpen}) {
    const makeCallA=useStore(state=>state.makeCall)
    const[phone,setPhone]=React.useState('38')
    const [openAlert,setOpenAlert]=React.useState(false)
 
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
     
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Замовити  дзвінок
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
          Будь ласка, введіть свій номер телефону <LocalPhoneIcon className='mr-2'/>
            і ми зателефонуємо <span className=' text-red-800 uppercase font-bold'>Вам</span> 
          </Typography>
          <TextField 
          inputProps={{
            selectionStart: 2, // Задаємо позначку (caret) після двох символів
          }}
          label="Телефон"
          autoFocus
        value={phone}
        sx={{width:"100%",marginTop: 1,"& label.Mui-focused": { color: "black" }, // Змінюємо колір тексту мітки при фокусі
        ":focus": { text: "black" }}}
        variant='standard'
  
       
        onChange={(event) => {
          const inputValue =event.target.value;

         if (inputValue=='')             setPhone("");

          if (/^\d+$/.test(inputValue) && inputValue.length <= 12 && inputValue.length>=0) {
          
            setPhone(inputValue);
          }
        }}/>
        
      
        </DialogContent>
        <DialogActions>
          <Button disabled={!(phone.length === 12)} autoFocus onClick={ async ()=>{setOpenAlert(true); handleClose();await makeCallA(phone);setPhone("38")}} sx={{color:'black'}}>
            Відправити
          </Button>
          

        </DialogActions>
      </BootstrapDialog>
      <AlertCustum open={openAlert} setOpen={setOpenAlert} text={'Менеджер зателефонує  ВАМ найближчим часом '} state={0}/> 
    </React.Fragment>
  );
}