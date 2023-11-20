import React, { useEffect } from 'react'
import AccordingCustum from '../components/AccordingCustum'
import { useStore } from '../store'

export default function MyOrders() {
  const getOrderTelegram=useStore(state=>state.getOrderTelegram)

  useEffect(()=>{
   async function fetch(){

      await getOrderTelegram()

    }
    fetch()

  },[])
  return (
    <div>
        <AccordingCustum/>
    </div>
  )
}
