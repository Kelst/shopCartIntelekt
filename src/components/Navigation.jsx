import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStore } from '../store';
import { useState } from 'react';
import { useEffect } from 'react';

const drawerWidth = 240;
const navItems = ['Роутери', 'Приставки', 'Точки доступу'];

function Navigation(props) {
  const { window,children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const getPrice=useStore(state=>state.getPrice)
  const [price,setPrice]=useState(0) 
  const shopCart=useStore(state=>state.shopCart)
  const cat=useStore(state=>state.cat)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

 
  useEffect(()=>{
 setPrice(getPrice())
  },[shopCart])



  return (
    <Box sx={{ display: 'flex' }}  >
   
      <AppBar component="nav" sx={{bgcolor:"#ea3439"}}>
        {price==0?"":`${price} (грн.)`}
        <Toolbar className=' flex justify-center bg-red-600' >
        <div className='flex   justify-between items-center w-[100%]'>
            <div className='flex gap-3'>
            
            {cat.map((item) => (
             <Link  key={item.id} to={`/category/${item.id}`}>
              <Button className=' shadow-md' color='error' variant='outlined' key={item.id} sx={{ color: '#fff',fontSize:"13px" }}>
                {item.cat}
              </Button>
              </Link>
            ))}
       
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
