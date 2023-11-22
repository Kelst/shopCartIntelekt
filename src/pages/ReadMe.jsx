import { Toys } from '@mui/icons-material'
import React from 'react'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
export default function ReadMe() {
  return (
    <div>
        <h2 className="text-2xl font-bold mb-4 font-medium">Умови доставки на повернення</h2>
        <div>
            <ul>
                <li className='flex gap-2 mb-2 shadow-md p-2'>
                        <AttachFileOutlinedIcon sx={{fontSize:"32px",textAlign:"lefr"}} className='text-red-800  font-bold text-2xl text-left' />
                       <span className=' text-[12px]' > Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores doloribus officia possimus doloremque esse quia voluptates sequi mollitia itaque, animi, ad, maxime iste suscipit unde! Veritatis nemo dolores a modi.</span></li>
                       <li className='flex gap-2 mb-2 shadow-md p-2'>
                        <AttachFileOutlinedIcon sx={{fontSize:"32px",textAlign:"lefr"}} className='text-red-800  font-bold text-2xl text-left' />
                       <span className=' text-[12px]' > Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores doloribus officia possimus doloremque esse quia voluptates sequi mollitia itaque, animi, ad, maxime iste suscipit unde! Veritatis nemo dolores a modi.</span></li>
                       <li className='flex gap-2 mb-2 shadow-md p-2'>
                        <AttachFileOutlinedIcon sx={{fontSize:"32px",textAlign:"lefr"}} className='text-red-800  font-bold text-2xl text-left' />
                       <span className=' text-[12px]' > Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores doloribus officia possimus doloremque esse quia voluptates sequi mollitia itaque, animi, ad, maxime iste suscipit unde! Veritatis nemo dolores a modi.</span></li>
                
                
            </ul>        
             
        </div>
    </div>
  )
}
