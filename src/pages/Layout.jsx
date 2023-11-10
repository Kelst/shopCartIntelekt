import React, { useEffect } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { useStore } from '../store'
import { useState } from 'react'
import { useTelegram } from '../hooks/useTelegram'
import $api_nova from '../nova-poshta'

export default function Layout() {
  const getAllCat=useStore(state=>state.getAllCat)
  const checkLocalStorage=useStore(state=>state.checkLocalStorage)
  const setTelegramId=useStore(state=>state.setTelegramId)
  const setAllCat=useStore(state=>state.setAllCat)
  const {tg,onToggleButton,user}=useTelegram() 
  const datas=useLoaderData()
  
  useEffect(()=>{
    tg.ready()
    setTelegramId(user?.id)
 setAllCat(datas)
 console.log(datas);
     async function  fetchData() {
  //   //   let d=await $api_nova.get('',
  //   //   {
  //   //     apiKey: "41249e216ac722eda29376114338da90",
  //   //     modelName: "Address",
  //   //     calledMethod: "getWarehouses",
  //   //     methodProperties: {
  //   //     CityName : "Дорошівці"
  //   //     }
  //   //  })
  //   //   console.log(d,"API NOVA");
      
     checkLocalStorage()
   }
   fetchData()

  },[])
  return (
    <div  >
     <Navigation>
    
    <Outlet/>
    
    </Navigation>
    </div>
  )
}
