import { Divider, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useStore } from '../store'
import { useNavigate } from 'react-router-dom';
import ButtomCustom from '../components/ButtomCustom';

export default function Cart() {
  const cat=useStore(state=>state.cat)
  const navigate=useNavigate()
  const setShovDynamicsNavigation=useStore(state=>state.setShovDynamicsNavigation)
  const setValue=useStore(state=>state.setIndex)
  const handleTo=(id,index)=>{
    setValue(index)
    navigate(`/category/${id}`,{ state: { id: id } })
  }
  useEffect(()=>{
    setShovDynamicsNavigation(false)
  },[])
  return (
    <div className='w-[300px] m-auto'>
    <div>
       <Typography variant='h4'>Вас вітає онлайн магазин </Typography> інтернет провайдера  <span className=' leading-loose text-xl font-bold'>INTELEKT</span>
     <Divider/>
     <span className=' block mt-5 uppercase'>Виберіть категорію товару який вас цікавить:</span>
<div className='mt-12 grid grid-cols-1 gap-6  sm:grid-cols-2 '>
     {
      cat.map((e,index)=><ButtomCustom key={e.id}   onClick={()=>handleTo(e.id,index)} text={e.cat} />
      )
     }
     </div>
    </div>
   
   </div>
  )
}
