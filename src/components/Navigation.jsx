import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStore } from '../store';
import { useState } from 'react';
import { useEffect } from 'react';
import LeftDrawer from './LeftDrawer';
import { Drawer } from '@mui/material';



function Navigation(props) {
  const { window,children } = props;
  const getPrice=useStore(state=>state.getPrice)
  const [price,setPrice]=useState(0) 
  const shopCart=useStore(state=>state.shopCart)
  const operators=useStore(state=>state.operators)
  const cat=useStore(state=>state.cat)

 

 
  useEffect(()=>{
 setPrice(getPrice())
  },[operators])



  return (
    <Box sx={{ display: 'flex' }}  >
   
      <AppBar component="nav" sx={{bgcolor:"#ea3439"}}>
       
        {price==0?"":`Замовлень на суму: ${price} (грн.)`}
        <Toolbar className=' flex justify-center bg-red-600' >
        <div className='flex   justify-between items-center w-[100%]'>
            <div className=' w-[10px] flex gap-3  justify-centr items-center'>
          {cat.length>2?
                    <div>
                    <LeftDrawer/>
                    
                    </div>
                    :
                    cat.map((item) => (
                        <Link  key={item.id} to={`/category/${item.id}`}>
                         <Button className=' shadow-md' color='error' variant='outlined' key={item.id} sx={{ color: '#fff',fontSize:"13px" }}>
                           {item.cat}
                         </Button>
                         </Link>
                       ))
        }

            
            {
                cat.length>2?
                <div className=' absolute left-[40%]'>Intelekt shop</div>:""
             }
          </div>
         
          <div className='flex-2'>
            <Link to='/shop-cart/'>
          <IconButton aria-label="cart" >
         <Badge badgeContent={shopCart}  sx={{color:"#fff"}}>
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
    </Link>
    </div>

    </div>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ pt: 0 , width:"100%"}} >
        <Toolbar />
            {children}
      </Box>
    </Box>
  );
}



export default Navigation;
