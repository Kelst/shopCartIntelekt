import React, { useEffect, useState } from 'react'
import { useStore } from '../store'
import ShopItem from '../components/ShopItem'
import ProductionQuantityLimitsTwoToneIcon from '@mui/icons-material/ProductionQuantityLimitsTwoTone';
import { Button, Typography } from '@mui/material';
export default function ShopCart() {
  const goodCart=useStore(state=>state.goodCart)
  const getPrice=useStore(state=>state.getPrice)
  const [sum,setSum]=useState(0)
  useEffect(()=>{
    setSum(getPrice())
  })
  return (
    <div className=' flex flex-col border h-[78vh] bg-white' >
          <div className='  uppercase font-bold underline'>
            Ваша корзина
          </div>
        {
          goodCart.length!=0?
        <div>  {goodCart.map(e=>(<ShopItem key={e.id} good={e}/>))}
        <Typography>
          Сума: {sum}
        </Typography>
        <Button>
          
        </Button>
        </div>
          :  <div className=' flex justify-center items-center flex-col gap-2 mt-44 uppercase text-red-600 '> Ваша корзина порожня <ProductionQuantityLimitsTwoToneIcon/> </div>
        }
    </div>
  )
}
