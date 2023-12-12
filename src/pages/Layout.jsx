import React, { useEffect } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { useStore } from '../store'
import { useState } from 'react'
import { useTelegram } from '../hooks/useTelegram'
import $api_nova from '../nova-poshta'
import fetchData from '../nova-poshta'
import AlertCustum from '../components/AlertCustum'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';

export default function Layout() {
  const getAllCat=useStore(state=>state.getAllCat)
  const checkLocalStorage=useStore(state=>state.checkLocalStorage)
  const setTelegramId=useStore(state=>state.setTelegramId)
  const setAllCat=useStore(state=>state.setAllCat)
  const getOrderTelegram=useStore(state=>state.getOrderTelegram)
  const getGoodsUniques=useStore(state=>state.getGoodsUniques)
  const {tg,onToggleButton,user}=useTelegram() 
  useEffect(()=>{
    async function fetch(){
 
       await getOrderTelegram(user.id)
 
     }
     fetch()
 
   },[])
   useEffect(()=>{
    async function fetch(){
 
       await getGoodsUniques()
 
     }
     fetch()
 
   },[])
  const datas=useLoaderData()
  useEffect(()=>{
    tg.ready()
    tg.expand()
    tg.onEvent('viewportChanged',()=>{
      tg.expand()
    },[])
    
    setTelegramId(user?.id)
tg.onEvent('backButtonClicked',()=>{
  return
})

 setAllCat(datas)
 console.log(datas);

    

    
checkLocalStorage()

  },[])
  return (
    <div  className='' style={{
      backgroundImage:"bg-url(../assets/big.png) bg-cover bg-center"
    }} >

     <Navigation/>
     
   
    <Outlet/>
    
  
    </div>
  )
}
