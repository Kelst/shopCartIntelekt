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

import { useStore } from '../store';
import { Link } from 'react-router-dom';
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
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {
             cat.map((item) => (
              <Link  key={item.id} to={`/category/${item.id}`}>

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