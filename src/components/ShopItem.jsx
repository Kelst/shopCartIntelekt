import { Image } from '@mui/icons-material'
import { Button, Input, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useStore } from '../store';
export default function ShopItem({good}) {
  const [count,setCount]=useState(1)
  const addToCart=useStore(state=>state.addToCart)
  const removeFromCart=useStore(state=>state.removeFromCart)
  const removeFromCartShop=useStore(state=>state.removeFromCartShop)

  useEffect(()=>{
setCount(good.count)
  },[])
  const handleAdd=()=>{
    const quantity=good.quantity
    if(count<quantity){
      setCount(e=>e+1)
      addToCart(good)
    }
  }

  const handleRem=()=>{
    if(count!=1){
      setCount(e=>e-1)
      removeFromCart(good)
    }
  }
  const handleDeleteFromCart=()=>{
    removeFromCartShop(good)
  }
  return (
    <div className='flex gap-2   justify-between  items-center mb-3 border w-[90%] mx-auto'>
      <div className=' pl-2 w-[25%] text-sm '>{good.name}</div>
      <div className=''>
      <img src={good.url} className='w-20 '/>
      
      </div>
      <div className=''>
        <Button variant='contained' onClick={handleAdd} sx={{bgcolor:"#ff9999",color:"black"}}>+</Button>
        <Typography className='font-bold'>{count}</Typography>
        <Button onClick={handleRem} sx={{bgcolor:"#ff9999",color:"black"}}>-</Button>
      </div>
      <div onClick={handleDeleteFromCart} className='mr-2 cursor-pointer'>
        <DeleteForeverIcon />
      </div>
      
    </div>
  )
} 
