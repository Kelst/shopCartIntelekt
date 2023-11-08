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
export default function GoodItem({good}) {
    const [flagBuy,setFlagBuy]=useState(false)
    const addToCart=useStore(state=>state.addToCart)
    const removeFromCart=useStore(state=>state.removeFromCart)
    const cheCkGoodInCart=useStore(state=>state.cheCkGoodInCart)
    const nav=useNavigate()

   React.useEffect(()=>{
    setFlagBuy(cheCkGoodInCart(good))
   },[])
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
<Card raised sx={{ height:745, maxWidth: 445,marginBottom:3,border:`${good.unique_price!=0?"2px solid red":""}` }} >
      <CardMedia
          component="img"

         sx={{
            height: 260,
            width:290,
            margin:"0 auto",
            objectFit: "contain" 
          }}
          
        image={`${good.url}`}


      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:"ds"}}>
          {good.name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
        {
  good.unique_price !== 0
    ? (
      <>
        <span className=' font-bold '>Ціна тижня {good.unique_price} грн.</span> замість старої ціни : {good.cost} грн.
      </>
    )
    : ""
}
{
     good.unique_price == 0?`${good.cost} (грн)`:""
}
       
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {good.text}
        </Typography>
      </CardContent>
      <CardActions className=' flex justify-between'>
        {
            flagBuy==false?
             <Button color='secondary' variant='outlined' onClick={handleBuy} startIcon={<ShoppingCartIcon/>} size="small">Купити</Button>
             :
            <div> <Button color='error'  variant='outlined' onClick={handleDelete} startIcon={<DeleteForeverIcon/>} size="small">Видалити з кошика</Button> <Button onClick={handleToShop}>Оформити замовлення</Button></div>
        }
       
       
      </CardActions>
    </Card>
  )
}
