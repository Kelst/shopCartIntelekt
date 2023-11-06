import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React from 'react'
import { useTelegram } from '../hooks/useTelegram';

export default function CheckOut() {
    const [name, setName] = React.useState('');
    const [place, setPlace] = React.useState('10');
    const handleChange = (event) => {
        console.log(place);
        setPlace(event.target.value);
      };
      const {tg,onToggleButton,user}=useTelegram()
  return (
    <div className='w-[260px] m-auto border p-9 shadow-md'>
        <Typography className=' uppercase  ' variant='h7'>Оформлення Замовлення </Typography>
       <div className='mt-8 flex flex-col justify-center items-center'>
          {
            JSON.stringify(user)
        }
        <TextField  label="ПІБ"
        value={name}
        sx={{width:"100%"}}
        variant='standard'
        onChange={(event) => {
          setName(event.target.value);
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
