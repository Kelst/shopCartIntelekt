import { Image } from '@mui/icons-material'
import { Button, Input, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
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
    <div className='flex gap-2 mt-2  justify-between  items-center mb-3 border w-[100%] mx-auto'>
      <div className=' pl-2 w-[25%] text-sm '>{good.name}</div>
      
      <div className=''>
      <img src={good.url} className='w-12 ml-12'/>
      
      </div>
      <div className=''>
        <div  className=' cursor-pointer hover:scale-125 transition duration-400 hover:bg-red-200 hover:rounded-full rounded-full justify-center items-center' onClick={handleAdd}><AddIcon/></div>
        <Typography className='font-bold'>{count}</Typography>
        <div onClick={handleRem}className=' cursor-pointer hover:scale-125 transition duration-400 hover:bg-red-200 hover:rounded-full rounded-full justify-center items-center' ><RemoveIcon/></div>
      </div>
      <div onClick={handleDeleteFromCart} className='mr-2 cursor-pointer'>
        <DeleteForeverIcon />
      </div>
      
    </div>
  )
} 
