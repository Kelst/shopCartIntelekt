import React from 'react'
import { useStore } from '../store'

export default function ShopCart() {
  const goodCart=useStore(state=>state.goodCart)
  
  return (
    <div>

        {
          goodCart.map(e=><p>{e.name}</p>)
        }
    </div>
  )
}
