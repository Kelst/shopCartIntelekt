import { Divider, Typography } from '@mui/material'
import React from 'react'
import { useStore } from '../store'
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const cat=useStore(state=>state.cat)
  const navigate=useNavigate()

  const handleTo=(id)=>{
    navigate(`/category/${id}`)
  }
  return (
    <div className='w-[300px] m-auto'>
    <div>
       <Typography variant='h4'>Вас вітає онлайн магазин </Typography> інтернет провайдера  <span className=' leading-loose text-xl font-bold'>INTELEKT</span>
     <Divider/>
     <span className=' block mt-5 uppercase'>Виберіть категорію товару який вас цікавить:</span>
    <div className=' mt-12 flex justify-center flex-col gap-6 items-center '>
     {
      cat.map(e=><button key={e.id}  type="button" onClick={()=>handleTo(e.id)} class=" w-[210px] uppercase text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">{e.cat}</button>
      )
     }
     </div>
    </div>
   
   </div>
  )
}
