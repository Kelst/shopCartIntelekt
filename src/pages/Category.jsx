import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useStore } from '../store';
import GoodItem from '../components/GoodItem';
import { Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel'

export default function Category() {
  let { id } = useParams(); 
  const [goodByCat,setGoodByCat]=useState([])
  const goods=useStore(state=>state.getGoods)
  const setCatNav=useStore(state=>state.setCatNav)
  const cat=useStore(state=>state.cat)
  const setShovDynamicsNavigation=useStore(state=>state.setShovDynamicsNavigation)

  let location = useLocation(); 
  useEffect(()=>{
    setShovDynamicsNavigation(true)
    let  regex = /\/category\//g;   
    let id=parseInt(location.pathname.replace(regex, ''));
    let index=cat.findIndex(e=>e.id==id)
    
    setCatNav(index||0)
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
     
      <Carousel indicators={true} sx={{minWidth:"315px"}} autoPlay={false}
      swipe
      duration={900}
      >
      { goodByCat.map(e=><GoodItem key={e.id} good={e}/>)}
      </Carousel>
    }
    
    </div>
  )
}
