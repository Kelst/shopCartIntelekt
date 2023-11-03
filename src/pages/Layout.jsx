import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { useStore } from '../store'
import { useState } from 'react'

export default function Layout() {
  const getAllCat=useStore(state=>state.getAllCat)
  const checkLocalStorage=useStore(state=>state.checkLocalStorage)

  
  useEffect(()=>{
    async function  fetchData() {
      await getAllCat()    
      checkLocalStorage()
    }
  fetchData()

  },[])
  return (
    <div>
     <Navigation>
    
    <Outlet/>
    
    </Navigation>
    </div>
  )
}
