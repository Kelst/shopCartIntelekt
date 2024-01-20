import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useStore } from '../store'

import GoodItem from './GoodItem';
import ListItem from './ListItem';


export default function ListView({showItem,flag,item=[]}) {
const [items,setItems]= useState([])
const getGoods=useStore(state=>state.getGoods)
const getGoodsUniques=useStore(state=>state.getGoodsUniques)

useEffect(()=>{

console.log("");
  if(flag==false)
   { async function fetch(){
        let goods=await getGoods(showItem)
    let a=   goods.map(e=><ListItem key={e.id} good={e}/>) 
setItems(a)
    }
    fetch()
  } else
  {
    try {
      
   
    async function fetch(){
    let goods=await getGoodsUniques(showItem)
let a=   goods.map(e=><ListItem key={e.id} good={e}/>) 

setItems(a)}
fetch()
 } catch (error) {
      console.log(error,'AAAAAAA');
    }
}
  


},[]) 
  return (
    // w-[250px]  m-auto
<div className={items.length==1?`w-[210px]  m-auto`: `w-[350px]  grid grid-cols-2 gap-2  `}>
    {
      ...items  
    }
</div>
  )
}

