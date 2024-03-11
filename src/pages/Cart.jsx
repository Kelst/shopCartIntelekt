import { Divider, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useStore } from '../store'
import { useNavigate } from 'react-router-dom';
import ButtomCustom from '../components/ButtomCustom';

export default function Cart() {
  const cat=useStore(state=>state.cat)
  const navigate=useNavigate()
  const goodsUnique=useStore(state=>state.goodsUnique)

  const setShovDynamicsNavigation=useStore(state=>state.setShovDynamicsNavigation)
  const setValue=useStore(state=>state.setIndex
    )

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
       <Typography variant='h4'>Вітаємо в онлайн-магазині </Typography> <span className='  leading-loose text-xl font-bold'> INTELEKT!</span>
     <Divider/>
     <span className=' block mt-5 uppercase'>Оберіть категорію товару який вас цікавить:</span>
<div className='mt-[20px] grid grid-cols-1 gap-6 gap-x-4  sm:grid-cols-2 '>
  {
    goodsUnique.length>0?
    <ButtomCustom key={cat.length}  flag={false} onClick={()=>handleTo(cat.length,cat.length)} text={'ЦІНА ТИЖНЯ'} />
  :<></>
  }
     {
      cat.map((e,index)=><ButtomCustom key={e.id} flag={true}  onClick={()=>handleTo(e.id,index)} text={e.cat} />
      )
     } 
     </div>
    
    </div>
   
   </div>
  )
}
