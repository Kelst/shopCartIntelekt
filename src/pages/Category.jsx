import React, { useCallback, useEffect, useState } from 'react'
import { useLoaderData, useLocation, useParams } from 'react-router-dom';
import { useStore } from '../store';
import GoodItem from '../components/GoodItem';
import { Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel'
import Slider from "react-slick";
import CaruselCustum from '../components/CaruselCustum';
import TabGoods from '../components/TabGoods';

export default function Category() {
  let { id } = useParams(); 
  const setCatNav=useStore(state=>state.setCatNav)
  const cat=useStore(state=>state.cat)
  const setShovDynamicsNavigation=useStore(state=>state.setShovDynamicsNavigation)
  const [showItem,setShowItem]=useState([])
  const operator2=useStore(state=>state.operator2)
const datas=useLoaderData()
  useEffect(()=>{

    console.log(datas,"DAT");
    setShovDynamicsNavigation(true)
    let index=cat.findIndex(e=>e.id==id)
    setCatNav(index)
     let a= datas.map(e=><GoodItem key={e.id} good={e}/>)
      setShowItem(a)
    console.log("CAtegory:",datas,"Index",index);
  


  },[])
  return (
    <div className=' flex  items-center justify-center w-[100%] mt-5  bg-white'>
      
      <TabGoods/>

    {/* {
      showItem.length==0?<Typography>Вибачте в даній категорії немає жодного товару</Typography>:
     
     <CaruselCustum showItem={[...showItem]} />
     
     
    } */}
  
    
    </div>
  )
}
