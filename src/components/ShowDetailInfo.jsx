import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ShowDetailInfo({ good,open,setOpen}) {

  
  const handleClose = () => setOpen(false);

  return (
    <div>
      
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        
    <Card className=' w-[320px] mt-[5%] h-[600px] m-auto'>
        <div onClick={()=>setOpen(false)}>
    <CloseIcon  className=' hover:animate-pulse text-red-800 relative top-2 left-[289px]  cursor-pointer' />
</div>
      <CardMedia
        component="img"
        sx={{
            height: 260,
            width:120,
            margin:"0 auto",
            objectFit: "contain", 
            paddingTop:5,
            paddingBottom:1
          }}
        image={good.url}
      />
      <Divider/>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {good.name}
        </Typography>
        <div className='h-[200px] overflow-scroll mb-4'>
        <Typography  variant="body2" color="text.secondary">
        {good.text}
        </Typography>
        </div>
      </CardContent>
 
    </Card>
    

      </Modal>
    </div>
  );
}
