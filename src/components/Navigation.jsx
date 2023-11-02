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

const drawerWidth = 240;
const navItems = ['Роутери', 'Приставки', 'Точки доступу'];

function Navigation(props) {
  const { window,children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
     
      
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
const shopCart=useStore(state=>state.shopCart)
const cat=useStore(state=>state.cat)
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
        <div className='flex  items-center  justify-center '>
            <div className=' flex-2'>
          <Box sx={{ display: {  sm: 'block' } } } >
            {cat.map((item) => (
             <Link  key={item.id} to={`/category/${item.id}`}>
              <Button key={item.id} sx={{ color: '#fff',fontSize:"11px" }}>
                {item.cat}
              </Button>
              </Link>
            ))}
          </Box>
          </div>
          <div className=''>
          <IconButton aria-label="cart" >
       <Badge badgeContent={shopCart}  sx={{color:"#fff"}}>
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
    </div>
    </div>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
            {children}
      </Box>
    </Box>
  );
}



export default Navigation;
