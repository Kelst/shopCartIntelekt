import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useStore } from '../store';
import CaruselCustum from './CaruselCustum';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function TabGoods() {
  const theme = useTheme();
  const cat=useStore(state=>state.cat)
  const value=useStore(state=>state.index)
  const setValue=useStore(state=>state.setIndex)
  

  React.useEffect(()=>{
    console.log(cat);
  },[])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'white', maxWidth: 400 }}>
      <AppBar position="static">
        <Tabs
          scrollButtons="auto"
          variant="scrollable"
           sx={{bgcolor:"red" }}

          value={value}
          onChange={handleChange}
          indicatorColor="white"
          textColor="inherit"
        >
            {
                cat.map((e,index)=>{
                    return  <Tab key={index} label={e.cat} />
                })
            }
         
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {
          cat.map((e,index)=>{
           return   <TabPanel value={value} index={index} dir={theme.direction}>
             
             <CaruselCustum showItem={e.id} />
             
              </TabPanel>
          })
        }
 
       
    
      </SwipeableViews>
    </Box>
  );
}