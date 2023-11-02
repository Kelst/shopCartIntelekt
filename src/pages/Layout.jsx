import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { useStore } from '../store'

export default function Layout() {
  const getAllCat=useStore(state=>state.getAllCat)
  useEffect(()=>{
    async function  fetchData() {
      await getAllCat()    
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
