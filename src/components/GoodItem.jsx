import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
import ShowDetailInfo from "./ShowDetailInfo"
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function GoodItem({good}) {
    const [flagBuy,setFlagBuy]=useState(false)
    const addToCart=useStore(state=>state.addToCart)
    const removeFromCart=useStore(state=>state.removeFromCart)
    const cheCkGoodInCart=useStore(state=>state.cheCkGoodInCart)
    const [open,setOpen]=useState(false)
    const nav=useNavigate()

   React.useEffect(()=>{
    setFlagBuy(cheCkGoodInCart(good))
   })
    const handleBuy=()=>{
        setFlagBuy(pre=>!pre) 
        addToCart(good)
 
    }
    const handleDelete=()=>{
        removeFromCart(good)
        setFlagBuy(pre=>!pre)
    }
    const handleToShop=()=>{
      nav("/shop-cart/")
    }
  return (
<Card raised className=' flex flex-col justify-end ' sx={{height:475,width:'auto',border:`${good.unique_price!=0?" solid red":" solid white"}` }} >
      <ShowDetailInfo open={open} good={good} setOpen={setOpen}/>
      <CardMedia
          component="img"
          loading='true'
        
         sx={{
            maxHeight: 140,
           width:100,
            margin:"0 auto",
            objectFit: "contain", 
            paddingTop:"20px"
          }}
          
        image={`${good.url}`}


      />
      
      <CardContent>
        <Typography gutterBottom variant="h7" component="div" sx={{fontFamily:"ds"}}>
          {good.name}
        </Typography>
        <Typography gutterBottom variant="h8" component="div">
        {
  good.unique_price !== 0
    ? (
      <>
        <span className=' font-bold text-red-100'>Ціна тижня {good.unique_price} грн.</span> замість старої ціни : {good.cost} грн.
      </>
    )
    : ""
}
{
     good.unique_price == 0?`${good.cost} (грн)`:""
}
       
        </Typography>
        <div className=' z-50 overflow-auto'  >
        <Typography   variant="body2" height={95}  sx={{fontSize:12,paddingTop:"1px",zIndex:"1000",overflow:"auto"}} color="text.secondary">
            {good.title}
        </Typography>
       
        </div>
        <Button variant='outlined' sx={{fontSize:"10px",mt:"10px"}} onClick={()=>setOpen(true)} fullWidth startIcon={<VisibilityIcon/>} >Детальніше ...</Button>
      </CardContent>
      <Divider/>
     
      <CardActions> 
        <div className='flex justify-center items-center  h-[60px]   bg-transparent w-[500px]'>
        {
            flagBuy==false?
             <Button color='secondary' sx={{fontSize:"10px"}} variant='outlined' onClick={handleBuy} startIcon={<ShoppingCartIcon/>} size="small">Купити</Button>
             :
            <div> <Button color='error'  sx={{fontSize:"10px"}}  variant='outlined' onClick={handleDelete} startIcon={<DeleteForeverIcon/>} size="small">Видалити з кошика</Button> <Button  sx={{fontSize:"10px"}}  onClick={handleToShop}>Оформити замовлення</Button></div>
        }
       
           </div>
      </CardActions> 
  
    </Card>
  )
}
