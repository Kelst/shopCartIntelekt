import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStore } from '../store';
import { useState } from 'react';
import { useEffect } from 'react';
import LeftDrawer from './LeftDrawer';
import { Drawer } from '@mui/material';
import BackDroopCustum from './BackDroopCustum';

import logoNav from "../assets/new-logow.png"
import bigW from "../assets/round-bigw.png"
import small from "../assets/round-small.png"

function Navigation(props) {
  const { window,children } = props;
  const getPrice=useStore(state=>state.getPrice)
  const [price,setPrice]=useState(0) 
  const shopCart=useStore(state=>state.shopCart)
  const operators=useStore(state=>state.operators)
  const cat=useStore(state=>state.cat)
  const [catNav,setCatnav]=useState(0)
  const operator2=useStore(state=>state.operator2)
  const setOperator2=useStore(state=>state.setOperator2)
  const shovDynamicsNavigation=useStore(state=>state.shovDynamicsNavigation)

const navigate=useNavigate()
const loc=useLocation()

let { id } = useParams(); 

 
  useEffect(()=>{
    

 setPrice(getPrice())
  },[operators])


const handleForvard=()=>{
  setOperator2()
  if(catNav==cat.length-1){
    setCatnav(0)
   
    navigate(`/category/${cat[0].id}`,{replace:true})
  }else
  {
    setCatnav(catNav+1)

    navigate(`/category/${cat[catNav+1].id}`,{replace:true})
  }
}
const orders=useStore(state=>state.orders)

const handleBack=()=>{
  setOperator2()
  setOperator2
  if(catNav==0){
    setCatnav(cat.length-1)
    navigate(`/category/${cat[cat.length-1].id}`)
  }else
  {
    setCatnav(catNav-1)
    navigate(`/category/${cat[catNav-1].id}`)
  }
}

  return (
    <Box sx={{ display: 'flex' }}  >
      <AppBar component="nav" sx={{bgcolor:"#ea3439",maxWidth:"100%"}}>
       
       <div className=' text-sm'>{price==0?"":`Замовлень на суму: ${price} (грн.)`}</div>
        <Toolbar className=' flex justify-center bg-red-600' >
        <div className='flex   justify-between items-center w-[100%]'>
            <div className=' w-[10px] flex-2 justify-centr items-center'>
     
                    <div>
                    <LeftDrawer/>
                    
                    </div>
                   
        

            
           
          </div>
          
            
              <div onClick={()=>navigate("/")} className='mt-1 ml-[39px] flex justify-center  items-center   cursor-pointer  '>
                 <img className='w-[95px] h-[50px] object-contain    '
          
                 src={logoNav}
              />
                  <div className=' relative  top-[-7px] left-[-80px] '>
                    <img  className='w-[10px] ml-[-6px] animate-my-spin' src={bigW} />
                    <img className='w-2 ml-[4px] mt-[-1px]  animate-reverse-spin ' src={small}  />
                  </div>
                  
                  </div>
             
          <div className='flex-2  '>
         {  orders?.length!=0? <Link to='/my-orders/'>
          <PrecisionManufacturingIcon/>
          </Link>:""}
            <Link to='/shop-cart/'>
              
          <IconButton aria-label="cart" >
         <Badge badgeContent={shopCart}  sx={{color:"#fff"}}>
        <ShoppingCartIcon  />
      </Badge>
      
    </IconButton>
    </Link>
    </div>

    </div>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ pt: 0 , width:"100%"}} >
      <BackDroopCustum/>

        <Toolbar />
            {children}
      </Box>
    </Box>
  );
}



export default Navigation;
