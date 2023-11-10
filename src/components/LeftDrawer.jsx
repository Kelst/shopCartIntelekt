import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logoNav from "../assets/new-logow.png"
import bigW from "../assets/big.png"
import small from "../assets/min.png"
import { useStore } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
const drawerWidth = 200;




const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function LeftDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const setValue=useStore(state=>state.setIndex)
  const value=useStore(state=>state.index)
  const navigate=useNavigate()
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const cat=useStore(state=>state.cat) 

  return (
   <>

<Toolbar className=' w-[10%] flex justify-center  items-center'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        
        open={open}
      >
        <DrawerHeader className='  '>
          <div onClick={()=>{setOpen(false)}}>
          <ChevronLeftIcon  className='relative left-[100px] cursor-pointer'/>
          </div>
        <div onClick={()=>{
          setOpen(false)
          navigate("/")}} className=' relative  right-11   cursor-pointer   '>
                 <img className='w-[95px] h-[50px] object-contain    '
          
                 src={logoNav}
                  alt="" srcset="" />
                  <div className=' relative  top-[-40px] left-[17px] '>
                    <img  className='w-[14px] ml-[-9px] animate-my-spin' src={bigW} alt="" srcset="" />
                    <img className='w-[10px] ml-[2.5px] mt-[-4px]  animate-reverse-spin ' src={small} alt="" srcset="" />
                  </div>
                  
                  </div>
        </DrawerHeader>
        <Divider />
        <List>
          {
             cat.map((item,index) => (
              <Link onClick={()=>setValue(index)} key={item.id} to={`/category/${item.id}`}>

              <ListItem key={item.cat} disablePadding>
              <ListItemButton onClick={()=>setOpen(false)}>
                <ListItemIcon>
                   <TurnedInIcon  className=''/> 
                </ListItemIcon>
                <ListItemText primary={item.cat} />
              </ListItemButton>
            </ListItem>
            </Link>
             
             ))  
          }
          
        </List>
        <Divider />
        <Link to='/shop-cart/'>
<ListItem  key={"shop-cart"}disablePadding>
<ListItemButton onClick={()=>setOpen(false)}>
  <ListItemIcon>
  <ShoppingCartIcon />

  </ListItemIcon>
  <ListItemText primary={"Кошик"} />
</ListItemButton>
</ListItem>
</Link>
      </Drawer>
     
    </>
  );
}