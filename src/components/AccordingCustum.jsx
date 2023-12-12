import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import Typography from '@mui/material/Typography';


import SvgIcon from '@mui/material/SvgIcon';
import { useStore } from '../store';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';

import MenuItem from '@mui/material/MenuItem';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';




const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  borderRadius:"8px",
  
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
        <SvgIcon>
        {/* credit: plus icon from https://heroicons.com/ */}
        <svg viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M17.6527 10.3496L19.7085 10.6856C19.8769 10.713 20.0003 10.8584 20 11.0289V12.9419C20 13.1106 19.8789 13.2553 19.7123 13.2845L17.6537 13.6459C17.5344 14.0584 17.3706 14.4557 17.1643 14.8313L18.3811 16.5207C18.4809 16.6591 18.4653 16.8494 18.3449 16.9701L16.9924 18.3235C16.8728 18.4428 16.6849 18.4598 16.5465 18.3621L14.8402 17.1652C14.4639 17.3746 14.0642 17.5416 13.6471 17.6643L13.2836 19.713C13.2544 19.879 13.11 20 12.9413 20H11.0281C10.858 20 10.7129 19.8772 10.6855 19.7099L10.3459 17.6713C9.92956 17.551 9.52778 17.385 9.14758 17.176L7.45352 18.3624C7.31542 18.4595 7.12723 18.4428 7.00791 18.3235L5.65545 16.9701C5.53544 16.8494 5.51978 16.6598 5.61858 16.5217L6.81555 14.8477C6.6044 14.4657 6.43673 14.0626 6.31533 13.6442L4.28698 13.2845C4.12105 13.255 4 13.1106 4 12.9419V11.0289C4 10.8591 4.12314 10.7137 4.29081 10.6859L6.31916 10.3482C6.44126 9.9287 6.60892 9.52557 6.81938 9.1447L5.63701 7.45322C5.53996 7.31513 5.55666 7.1273 5.67597 7.008L7.02809 5.656C7.1488 5.536 7.33768 5.52 7.47648 5.61913L9.15662 6.81913C9.53405 6.61252 9.93478 6.448 10.3522 6.328L10.6848 4.29183C10.7122 4.12348 10.8576 4 11.0281 4H12.9413C13.1104 4 13.2547 4.12174 13.2839 4.288L13.6426 6.3353C14.0576 6.456 14.4576 6.62226 14.8364 6.83165L16.5211 5.62087C16.6595 5.52104 16.8495 5.5367 16.9702 5.65704L18.323 7.00904C18.4423 7.1287 18.459 7.31687 18.3619 7.45496L17.1618 9.16522C17.3678 9.54052 17.5323 9.93704 17.6527 10.3496ZM9.56501 12C9.56501 13.3447 10.6552 14.4348 12 14.4348C13.3448 14.4348 14.435 13.3447 14.435 12C14.435 10.6553 13.3448 9.56522 12 9.56522C10.6552 9.56522 9.56501 10.6553 9.56501 12Z" fill="#000000"></path> </g></svg>      </SvgIcon>
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(232, 222, 185, .05)',
      
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper': {
    transition: "all 1s ease-out",
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-collapsed': {
    transform: 'rotate(0deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },

 
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  height:" 100%",


}));

export default function AccordingCustum({}) {
  
  const [expanded, setExpanded] = React.useState('panel1');
  const orders=useStore(state=>state.orders)
  const [filteredOrders,setFilteredOrders]=React.useState([])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [title,setTitle]=React.useState("Усі замовлення")
  const open = Boolean(anchorEl);

  React.useEffect(()=>{
setFilteredOrders(orders)
  },[])
  const handleFilter=(filter)=>{
    switch (filter ){
      case "all":
          setTitle('Усі замовлення')
          setFilteredOrders(orders)
          setAnchorEl(null);
       break
      case "in":
      setTitle('Опрацьовуються')
      const arr=orders.filter(e=>{
        return e.status==0
      })
      setFilteredOrders(arr)
      setAnchorEl(null);

        break
      case "prog":
       { setTitle('Опрацьовані')  
        const arr=orders.filter(e=>{
          return e.status==1
        })
        setFilteredOrders(arr)
        setAnchorEl(null);}

      break
      case "done":
       { setTitle('Отримані')
        const arr=orders.filter(e=>{
          return e.status==2
        })
        setFilteredOrders(arr)
        setAnchorEl(null);}

      
    }
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  function formatDateString(isoDateString) {
    const normalDate = new Date(isoDateString);
  
    const year = normalDate.getFullYear();
    const month = normalDate.getMonth() + 1; // Додаємо 1, так як місяці у JavaScript ідуть від 0 до 11
    const day = normalDate.getDate();
    const hours = normalDate.getHours();
    const minutes = normalDate.getMinutes();
  
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hours}:${minutes}`;
  
    return formattedDate;
  }
  return (
    <div>
     {
      orders?.length!=0?
      <>
        <div className=' flex flex-col items-center justify-center gap-1'>
        <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color: 'black', borderColor: 'black', '&:hover': { borderColor: 'black' } }}
        variant='outlined'
      >
        Фільтр замовлень
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      > 
        <MenuItem onClick={()=>{handleFilter('all')}}>Усі замовлення</MenuItem>
        <MenuItem onClick={()=>{handleFilter('in')}}>Опрацьовуються</MenuItem>
        <MenuItem onClick={()=>{handleFilter('prog')}}>Опрацьовані</MenuItem>
        <MenuItem onClick={()=>{handleFilter('done')}}>Отримані</MenuItem>
        
      </Menu>
      <div className=' uppercase font-bold font-sm border-b-orange-800'>{title}</div>
      </div>
      {
    
    filteredOrders.length!==0?  filteredOrders.map((e,index)=>{
          return   <Accordion key={index}  expanded={expanded === `panel${e.id}`} onChange={handleChange(`panel${e.id}`)}>
          <AccordionSummary  aria-controls="panel1d-content" id="panel1d-header">
           <div className=' flex    items-center flex-col  ml-auto mr-auto '> 
            <div className='flex flex-col mb-6'>
            <Typography sx={{fontSize:18}} >Замовлення # {e.id} </Typography> 
            <Typography sx={{fontSize:10}} className=' border-l-2 pl-1 border-b-2 color  text-sm ' > { formatDateString(e.date)}</Typography> 
           
            </div>
            <div className=' right-[50%] bottom-0 flex gap-x-1 items-center'>
              {e.status==0?" обробляється":e.status=='1'?'опрацьовано':<span className=' text-gray-600'>отримано</span>}
              
              
             
              {e.status==0? <HourglassBottomIcon className='  text-amber-300' />:e.status=='1'?<HourglassFullIcon className='  text-amber-400' />:<CheckCircleIcon className=' text-lime-600'/>}

            </div>
               
            </div>
           
          </AccordionSummary>
       
          <AccordionDetails >
            <ul>
              <li className=' flex flex-col gap-3    justify-items-center items-center  border-b-2 mb-2'>
                 <span className=' text-md  font-bold uppercase border-b-2 text-cebter]'>Отримувач  </span>
                 
                <span className=' text-sm text-center'>
                 {e.name}
                </span>
              </li>
              <li className=' flex flex-col gap-3    justify-items-center items-center  border-b-2 mb-2'>
                 <span className=' text-md  font-bold uppercase border-b-2 text-cebter]'>Адреса  </span>
                 
                <span className=' text-sm text-center'>
                 {e.address}
                </span>
              </li>
              <li className=' flex flex-col gap-3    justify-items-center items-center  border-b-2 mb-2'>
                 <span className=' text-md  font-bold uppercase border-b-2 text-cebter]'>Замовлення  </span>
                 
                <span className=' text-sm text-center'>
                 {e.cart_json}
                </span>
              </li>
              <li className=' flex flex-col gap-3    justify-items-center items-center  border-b-2 mb-2'>
                 <span className=' text-md  font-bold uppercase border-b-2 text-cebter]'>Сума  </span>
                 
                <span className=' text-sm text-center'>
                 {e.sum} грн
                </span>
              </li>
            </ul>
      
          </AccordionDetails>
        </Accordion>
        }):<div>Порожньо</div>
      }
   
     </>
      
      
      
      :<div>
     
        <Typography sx={{fontWeight:"bold", fontSize:"12px",marginTop:"20px",textAlign:"center",textDecoration:"underline"}}> Вибачте у вас немає замовлень</Typography></div>
      
     }
  
     
    </div>
  );
}