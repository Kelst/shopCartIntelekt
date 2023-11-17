import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useStore } from '../store'
import { useLoaderData, useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import GoodItem from './GoodItem';


export default function CaruselCustum({showItem}) {
const [items,setItems]= useState([])
const getGoods=useStore(state=>state.getGoods)

useEffect(()=>{
    async function fetch(){
        let goods=await getGoods(showItem)
    let a=   goods.map(e=><GoodItem key={e.id} good={e}/>) 
setItems(a)
    }
    fetch()


},[]) 
  return (
    
    <Carousel 
    
   
    
    sx={{minWidth:"325px", marginTop:"-15px", marginLeft:"-16px", display:"flex", flexDirection:"column", justifyItems:"center", alignItems:"center"}} 
    autoPlay={false}
    swipe 
    duration={200}
    cycleNavigation={true}
   
    >
    { 
    ...items
    }

    </Carousel>
  )
}

