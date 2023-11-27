import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Typography, Radio, FormControlLabel, RadioGroup } from '@mui/material';

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
        <DialogTitle>Умови оплати та доставки:</DialogTitle>
        
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          <div class="max-w-2xl mx-auto p-4">
  <h2 class="text-xl font-bold mb-4">Способи доставки:</h2>

  <div class="mb-6">
    <p class="text-lg">Нова пошта (за тарифами перевізника).</p>
    <p class="text-sm">Доставкою Нова Пошта- 100% предоплата на обраний товар.</p>
  </div>

  <div class="mb-6">
    <p class="text-lg">Самовивіз:</p>
    <p class="text-sm">м. Чернівці, проспект Незалежності, 131, ТЦ "Проспект", оф. № 128А (праворуч від ескалатору)</p>
    <p class="text-sm">м. Чернівці, вул. Головна, 265а, ТРЦ «DEPOt» (2-й поверх)</p>
  </div>
</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{color:"black"}} onClick={handleClose}>Закрити</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
