import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useStore } from '../store';
import GoodItem from '../components/GoodItem';
import { Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel'

export default function Category() {
  let { id } = useParams(); useParams
  const [goodByCat,setGoodByCat]=useState([])
  const goods=useStore(state=>state.getGoods)
  useEffect(()=>{

    async function fetchData(id) {

      const data=await goods(id)  
      setGoodByCat(data)
    }
    fetchData(id)
  },[goods,id])
  return (
    <div className=' flex flex-col items-center justify-center w-[100%]  bg-white'>

    {
      goodByCat.length==0?<Typography>Вибачте в даній категорії немає жодного товару</Typography>:
     
      <Carousel indicators={false} sx={{width:"315px"}} autoPlay={false}
      swipe
      >
      { goodByCat.map(e=><GoodItem key={e.id} good={e}/>)}
      </Carousel>
    }
    
    </div>
  )
}
