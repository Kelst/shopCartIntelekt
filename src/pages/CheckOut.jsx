import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography, getAccordionDetailsUtilityClass } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import { useTelegram } from '../hooks/useTelegram';
import { useStore } from '../store';
import fetchData from '../nova-poshta';
import ButtomCustom from '../components/ButtomCustom';

export default function CheckOut() {
    const [name, setName] = React.useState('');
    const [place, setPlace] = React.useState('10');

    const [phone, setPhone] = React.useState('');
    const [adress, setAdress] = React.useState('');
    const [vidilen, setVidilen] = React.useState([]);
    const [placeVidil, setPlaceVidil] = React.useState("");
    const [loading,setLoading]=useState(false)
    const [text,setText]=useState("")
    const handleChange = (event) => {
        setAdress("")
        setPlace(event.target.value);
      };  
      const handleChangeVidill=(event)=>{
        setPlaceVidil(event.target.value)
      }
      const {tg,onToggleButton,user}=useTelegram()
      const getPhone=useStore(state=>state.getPhone)

     const onSendData=useCallback(()=>{
      data
      const data={
        phone,name
      }
      window.Telegram.WebApp.sendData(JSON.stringify(data))
      tg.close()
     },[phone,name])

        useEffect(()=>{
          let timerId;
           setVidilen([])
           setPlaceVidil("")
          async function getData() {
          
            try {
              setLoading(true);
              clearTimeout(timerId);

          
              timerId = setTimeout(async () => {
                const data = await fetchData(adress);
                setVidilen(data);
                setPlaceVidil("0")
              }, 600); 
            } catch (error) {
            
            } finally {
              setLoading(false);
            }
          }
          if(adress.trim()!="")
          getData();

          return () =>{
            setVidilen([])
            clearTimeout(timerId)};
        },[adress])


     useEffect(()=>{
      window.Telegram.WebApp.MainButton.onClick(onSendData)

      
     },[])
      useEffect(()=>{
        if(name!==""&&phone!=="") {
          tg.MainButton.show()
        }
       
        async function  fetchData(){
          let p=  await getPhone(user.id)
       
          setPhone(p)
        }
        fetchData()
      },[name,phone])
  return (
    <div className='w-[303px] m-auto border p-9 shadow-md'>
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
            <FormControl sx={{ marginTop: 3, width:"100%",textAlign:"left"}}>
        <InputLabel >Забрати з</InputLabel>
        
        <Select
        variant='standard'
          id="demo-simple-select-helper"
          value={place}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>ТЦ "Проспект", оф. № 128А (праворуч від ескалатору)</MenuItem>
          <MenuItem value={20}>ТРЦ «DEPOt» (2-й поверх)</MenuItem>
          <MenuItem value={30}>Нова Пошта</MenuItem>

        </Select>
        {
          place=='30'?
          <div className=' relative'>
          <TextField  label="Населений пункт"
          value={adress}
          sx={{width:"100%",marginTop:"10px"}}
          variant='standard'
          onChange={(event) => {
            setAdress(event.target.value);
          }}/>
          

           
          {loading==true? <CircularProgress  color='warning'  size={24}/>:  <FormControl sx={{ width:"100%"}}>  <Select
          
           
          variant='standard'
   
          id="serl"
          value={placeVidil}
         
          sx={{width:"100%",marginTop:"10px"}}
          fullWidth
          onChange={handleChangeVidill}
        >
         {
          vidilen.map((e,index)=><MenuItem  sx={{width:"100%", whiteSpace: "normal",  wordWrap: "break-word"}} key={index} value={index}>{e.Description}</MenuItem>)
         }

        </Select>        </FormControl>

        }
          </div>
          
          : ""
        }
        <TextField
          id="standard-multiline-static"
          sx={{marginTop:3}} 
          label="Короткий коментар"
          multiline
          rows={2}
          value={text}
          onChange={e=>{
            setText(e.target.value)
          }}
         
          variant="standard"
        />
     
      </FormControl>  
        <Button sx={{marginTop:3}} variant='outlined' disabled={
    place !== "30"
      ? !(name.trim() !== "" && phone.trim() !== "" && adress.trim() !== "")
      : !(name.trim() !== "" && phone.trim() !== "")
  }   >Завершити</Button>
        </div>

    </div>
  )
}
