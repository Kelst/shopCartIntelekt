import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import Toolbar from '@mui/material/Toolbar';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
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
import logoNav from "../assets/new-logow2.png"
import bigW from "../assets/big.png"
import small from "../assets/min1.png"
import { useStore } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import { Backdrop } from '@mui/material';
import CustumeIcon from './CustumeIcon';
import CustumeDone from './CustumDone';
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
  const [openBack, setOpenBack] = React.useState(false);
  const setValue=useStore(state=>state.setIndex)
  const value=useStore(state=>state.index)
  const goodsUnique=useStore(state=>state.goodsUnique)

  const navigate=useNavigate()
  const handleDrawerOpen = () => {
    setOpenBack(true)
    setOpen(true);
  };

  
  const cat=useStore(state=>state.cat) 

  return (
   <>

<Toolbar className=' flex justify-center  items-center'>
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
          zIndex:100,
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
          <div onClick={()=>{setOpen(false)
          setOpenBack(false)
          }}>
          <ChevronLeftIcon  className='  relative left-[100px] cursor-pointer text-white  bg-black rounded-lg '/>
          </div>
        <div onClick={()=>{
          setOpen(false)
          setOpenBack(false);
          navigate("/")}} className=' relative  right-11   cursor-pointer  mt-8 mb-1 '>
                 <img className='w-[95px] h-[50px] object-contain    '
          
                 src={logoNav}
                />
                  <div className=' relative  top-[-40px] left-[17px] '>
                    <img  className='w-[14px] ml-[-9px] animate-my-spin' src={bigW}  />
                    <img className='w-[10px] ml-[2.5px] mt-[-4px]  animate-reverse-spin ' color='red' src={small} alt=""  />
                  </div>
                  
                  </div>
        </DrawerHeader>
        <Divider />
        <List>
          {
           goodsUnique.length>0?
           <Link onClick={()=>setValue(cat.length)} key={cat.length} to={`/category/${cat.length}`}>

           <ListItem key={'Ціна тижня'} className='bg-red-600 text-white' disablePadding>
           <ListItemButton onClick={()=>{setOpen(false) 
           setOpenBack(false)}
           }>
             <ListItemIcon>
                <TurnedInNotOutlinedIcon  className=' text-white '/> 
             </ListItemIcon>
             <ListItemText className=' uppercase'  primary={'Ціна тижня'} />
           </ListItemButton>
         </ListItem>
         </Link>
         :<>
         </>
          }
          {
             cat.map((item,index) => (
              <Link onClick={()=>setValue(index)} key={item.id} to={`/category/${item.id}`}>

              <ListItem  sx={{textTransform:'lowercase'}} key={item.cat} disablePadding>
              <ListItemButton onClick={()=>{setOpen(false) 
              setOpenBack(false)}
              }>
                <ListItemIcon>
                   <TurnedInNotOutlinedIcon  className=''/> 
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
<ListItemButton onClick={()=>{setOpen(false)
    setOpenBack(false)

}}>
  <ListItemIcon>
  <ShoppingCartOutlinedIcon />

  </ListItemIcon>
  <ListItemText  sx={{textTransform:'lowercase'}} primary={"Кошик"} />
</ListItemButton>
{/* import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'; */}

</ListItem>
</Link>
<Link to='my-orders/'>
<ListItem  key={"my-orders/"}disablePadding>
<ListItemButton onClick={()=>{setOpen(false)
    setOpenBack(false)

}}>
  <ListItemIcon>
  <CustumeIcon  /> 

  </ListItemIcon>
  <ListItemText  sx={{textTransform:'lowercase'}}  primary={"Замовленння"} />
</ListItemButton>
{/* import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'; */}

</ListItem>
</Link>
<Divider/>
<Link to='/read-me/'>
<ListItem  key={"read-me"}disablePadding>
<ListItemButton onClick={()=>{setOpen(false)
    setOpenBack(false)

}}>
  <ListItemIcon>
  <CustumeDone  /> 

  </ListItemIcon>
  <ListItemText   sx={{fontSize:"5px",textTransform:'lowercase'}} primary={"Оплата та доставка"} />
</ListItemButton>
{/* import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'; */}

</ListItem>
</Link>
<Link to='/warranty/'>
<ListItem  key={"warranty"}disablePadding>
<ListItemButton onClick={()=>{setOpen(false)
    setOpenBack(false)

}}>
  <ListItemIcon>
  <RotateLeftOutlinedIcon  /> 

  </ListItemIcon>
  <ListItemText  sx={{fontSize:"5px",textTransform:'lowercase'}} primary={"Гарантія та повернення"} />
</ListItemButton>
{/* import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'; */}

</ListItem>
</Link>
      </Drawer>
      <Backdrop
        sx={{ zIndex:99 }}
        open={openBack}
        onClick={()=>{
          setOpenBack(false);
          setOpen(false)}}
      />
     
    </>
  );
}