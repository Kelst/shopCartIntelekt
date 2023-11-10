import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useTelegram } from '../hooks/useTelegram';
import { useStore } from '../store';

export default function CheckOut() {
    const [name, setName] = React.useState('');
    const [place, setPlace] = React.useState('10');
    const [phone, setPhone] = React.useState('');
    const handleChange = (event) => {
        console.log(place);
        setPlace(event.target.value);
      };
      const {tg,onToggleButton,user,buttonTelegram}=useTelegram()
      const getPhone=useStore(state=>state.getPhone)
      useEffect(()=>{
        if(name!==""&&phone!=="") {
          buttonTelegram.show()
        }
       
        async function  fetchData(){
          let p=  await getPhone(user.id)
       
          setPhone(p)
        }
        fetchData()
      },[phone,place,name])
  return (
    <div className='w-[260px] m-auto border p-9 shadow-md'>
        <Typography className=' uppercase  ' variant='h7'>Оформлення Замовлення </Typography>
       <div className='mt-8 flex flex-col justify-center items-center'>
    
        <TextField  label="ПІБ"
        value={name}
        sx={{width:"100%"}}
        variant='standard'
        onChange={(event) => {
          setName(event.target.value);
        }}/>
         <TextField  label="Телефон"
        value={phone}
        sx={{width:"100%",marginTop: 1}}
        variant='standard'
       
        onChange={(event) => {
          const inputValue =event.target.value;

         if (inputValue=='')             setPhone("");

          if (/^\d+$/.test(inputValue) && inputValue.length <= 12 && inputValue.length>=0) {
          
            setPhone(inputValue);
          }
        }}/>
            <FormControl sx={{ marginTop: 3, width:"100%"}}>
        <InputLabel >Забрати з</InputLabel>
        <Select
        variant='standard'
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={place}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>ТЦ "Проспект", оф. № 128А (праворуч від ескалатору)</MenuItem>
          <MenuItem value={20}>ТРЦ «DEPOt» (2-й поверх)</MenuItem>

        </Select>
      
      </FormControl>  
        </div>

    </div>
  )
}
