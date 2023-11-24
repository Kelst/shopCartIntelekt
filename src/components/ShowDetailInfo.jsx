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
function splitText(text, maxLength = 420) {
  // Розділити текст на окремі слова
  const words = text.split(' ');

  // Ініціалізувати пустий масив для зберігання результатів
  const result = [];

  // Ініціалізувати змінну для поточного елементу масиву
  let currentElement = words[0];

  // Пройти по словах і додати їх до поточного елементу масиву, поки не досягнуто максимальної довжини
  for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const proposedElement = currentElement + ' ' + word;

      if (proposedElement.length <= maxLength) {
          // Якщо можна додати поточне слово до поточного елементу масиву
          currentElement = proposedElement;
      } else {
          // Додати поточний елемент масиву до результату і розпочати новий елемент
          result.push(currentElement.trim());
          currentElement = word;
      }
  }

  // Додати останній елемент масиву до результату
  result.push(currentElement.trim());

  return result;
}
const unescapeHTML = (text) => {
  const doc = new DOMParser().parseFromString(text, "text/html");
  return doc.body.innerHTML;
};
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
  component="div"
  sx={{
    height: 100,
    width: 120,
    margin: "0 auto",
    objectFit: "contain",
    paddingTop: 5,
    paddingBottom: 1,
   
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    contain: "none",
    backgroundImage: `url(${good.url})`, // Вставте URL вашої картини тут
    backgroundSize: "contain", // Зробити так, щоб зображення не розтягувалося
    backgroundRepeat: "no-repeat", // Запобігає повторенню фонового зображення
  }}
/>
      <Divider/>
      <CardContent  sx={{ maxWidth:"300px",textAlign:"center", overflowY:"auto", padding:"20px", display:"flex",flexDirection:"column", alignItems:"center",justifyContent:"center"}}>

        <Typography gutterBottom variant="h5" component="div">
          {good.name}
        </Typography>
       <div className=' pb-4 text-center'>
       <Typography
  sx={{
    fontSize: "12px",
    whiteSpace: "pre-line",
    lineHeight:1.4 ,
    marginBottom:"1px"
  }}
  color="text.secondary"
>
  {textInfo[page - 1]}
</Typography>
        </div> 
        
        <div className=' absolute bottom-0 '>
        <Stack spacing={2} >
      <Pagination className=' pb-4 pt-4' count={textInfo.length} page={page} onChange={handleChange} />
    </Stack>
        </div>
       
      </CardContent>
 
    </Card>
    

      </Modal>
    </div>
  );
}
