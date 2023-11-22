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
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
function splitText(paragraph) {
   // Split the text into words using spaces
   const words = paragraph.split(' ');

   // Find the middle index of the words array
   const middleIndex = Math.floor(words.length / 2);

   // Join the words from the start to the middle (exclusive) as the first half
   const firstHalf = words.slice(0, middleIndex).join(' ');

   // Join the words from the middle to the end as the second half
   const secondHalf = words.slice(middleIndex).join(' ');

   // Return an array with the two halves
   return [firstHalf, secondHalf];
}

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

  const [page, setPage] = React.useState(1);
  const [textInfo,setTextInfo]=React.useState([])
  const handleChange = (event, value) => {
    setPage(value);
  };

  React.useEffect(()=>{
    setTextInfo(splitText(good.title +' '+good.text))
  },
  [])
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
        
    <Card className=' relative w-[320px] mt-[5%] h-[80vh] m-auto overflow-auto '>
        <div onClick={()=>setOpen(false)}>
    <CloseIcon  className=' hover:animate-pulse text-red-800 relative top-2 left-[279px]  cursor-pointer' />
</div>
      <CardMedia
        component="img"
        sx={{
            height: 160,
            width:120,
            margin:"0 auto",
            objectFit: "contain", 
            paddingTop:5,
            paddingBottom:1
          }}
        image={good.url}
      />
      <Divider/>
      <CardContent  sx={{ maxWidth:"300px",textAlign:"center", overflowY:"auto", padding:"20px", display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"center"}}>

        <Typography gutterBottom variant="h5" component="div">
          {good.name}
        </Typography>
       <div className=' pb-4 text-center'>
        <Typography  sx={{
            fontSize:"12px"
        }}  color="text.secondary">
        {textInfo[page-1]}
        
        
        </Typography>
        </div> 
        
        <div className=' absolute bottom-0 '>
        <Stack spacing={2} >
      <Pagination className=' pb-4' count={2} page={page} onChange={handleChange} />
    </Stack>
        </div>
       
      </CardContent>
 
    </Card>
    

      </Modal>
    </div>
  );
}
