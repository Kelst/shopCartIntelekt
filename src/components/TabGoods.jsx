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
import ListView from './ListView';
import IOSSwitch from './IOSSwitch';
import GridViewIcon from '@mui/icons-material/GridView';
import ReorderIcon from '@mui/icons-material/Reorder';
import Tooltip from '@mui/material/Tooltip';

function TabPanel(props) {
  const { children, value, index,flagList, ...other } = props;

  return (
    <div
    className=' '
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
          // p:3,paddingLeft:4 
        <Box sx={flagList==false?{ p:3,paddingLeft:4  }:{ paddingTop: 1,paddingLeft:0.7}}>
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
   
  };
}

export default function TabGoods() {
  const theme = useTheme();
  const cat = useStore((state) => state.cat);
  const goodsUnique = useStore((state) => state.goodsUnique);
  const flagList = useStore((state) => state.flagList);
  const value = useStore((state) => state.index);
  const setValue = useStore((state) => state.setIndex);
const switchFlagList=useStore(state=>state.switchFlagList)
  React.useEffect(() => {
    console.log(cat);
  }, [cat]); // Додано cat до залежностей

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'white', width:'95vw', marginTop: '-6px' }}>
      <AppBar position="static ">
        <Tabs
         variant="scrollable"
         scrollButtons
         allowScrollButtonsMobile
         aria-label="scrollable force tabs example"
          className='p-1 z-50 '
          sx={{ bgcolor: 'red' }}
          value={value}
          onChange={handleChange}
          indicatorColor="white"
          textColor="inherit"
        >
          {cat.map((e, index) => (
            <Tab key={index} label={e.cat} {...a11yProps(index)} />
          ))}
          {goodsUnique.length > 0 && (
            <Tab
              key={cat.length}
              label="Ціна тижня"
              {...a11yProps(cat.length)}
            />
          )}
        </Tabs>
        
      </AppBar>
      <div className='w-[150px] ml-3 mr-auto h-[30px] mt-1 flex  justify-start items-center gap-1'>
      <Tooltip title="grid" placement="top"> <GridViewIcon onClick={()=>{switchFlagList(true)}} className={`${flagList==true?' bg-red-800 rounded-md text-white':''}`}/></Tooltip>
      <Tooltip title="slide" placement="top"> <ReorderIcon onClick={()=>{switchFlagList(false)}} className={`rotate-90 ${flagList==false?' bg-red-800  text-white rounded-md':''}`}/></Tooltip>
      
      </div>
      
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        className=' ml-[2.5px] bg-white shadow-xl '
      >
     
        {cat.map((e, index) => (
          <TabPanel  key={index} value={value} index={index} dir={theme.direction} flagList={flagList} >
          {flagList==false?<CaruselCustum showItem={e.id} flag={false} />: <ListView  showItem={e.id} flag={false}/>}  
          {/* <ListView  showItem={e.id} flag={false}/> */}
          </TabPanel>
        ))}
        {goodsUnique.length > 0 && (
          <TabPanel value={value} index={cat.length} dir={theme.direction} flagList={false}>
            <CaruselCustum item={[...goodsUnique]} flag={true} /> 
            {/* <ListView item={[...goodsUnique]} flag={true} /> */}
            
          </TabPanel>
        )}
      </SwipeableViews>
    </Box>
  );
}
