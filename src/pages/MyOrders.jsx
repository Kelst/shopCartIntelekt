import React, { useEffect } from 'react'
import AccordingCustum from '../components/AccordingCustum'
import { useStore } from '../store'
import { useTelegram } from '../hooks/useTelegram'

export default function MyOrders() {
  const getOrderTelegram=useStore(state=>state.getOrderTelegram)
  const {tg,onToggleButton,user}=useTelegram() 

  useEffect(()=>{
   async function fetch(){

      await getOrderTelegram(user.id)

    }
    fetch()

  },[])
  return (
    <div>
        <AccordingCustum/>
    </div>
  )
}
