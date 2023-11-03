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
export default function GoodItem({good}) {
    const [flagBuy,setFlagBuy]=useState(false)
    const addToCart=useStore(state=>state.addToCart)
    const removeFromCart=useStore(state=>state.removeFromCart)
    const cheCkGoodInCart=useStore(state=>state.cheCkGoodInCart)


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
  return (
<Card raised sx={{ maxWidth: 445,marginBottom:3 }}>
      <CardMedia
          component="img"

         sx={{
            height: 340,
            width:300,
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
          {good.cost} грн.
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
             <Button color='error'  variant='outlined' onClick={handleDelete} startIcon={<DeleteForeverIcon/>} size="small">Видалити з кошика</Button>
        }
       
       
      </CardActions>
    </Card>
  )
}
