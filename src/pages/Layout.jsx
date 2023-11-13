import React, { useEffect } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { useStore } from '../store'
import { useState } from 'react'
import { useTelegram } from '../hooks/useTelegram'
import $api_nova from '../nova-poshta'
import fetchData from '../nova-poshta'
import AlertCustum from '../components/AlertCustum'

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
    

    
checkLocalStorage()

  },[])
  return (
    <div  >
     <Navigation>
     
    
    <Outlet/>
    
    </Navigation>
    </div>
  )
}
