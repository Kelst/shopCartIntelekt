import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography, getAccordionDetailsUtilityClass } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import { useTelegram } from '../hooks/useTelegram';
import { useStore } from '../store';
import fetchData from '../nova-poshta';
import ButtomCustom from '../components/ButtomCustom';
import AlertCustum from '../components/AlertCustum';
import { useNavigate } from 'react-router-dom';

export default function CheckOut() {
    const [name, setName] = React.useState('');
    const [place, setPlace] = React.useState(10);

    const [phone, setPhone] = React.useState('');
    const [adress, setAdress] = React.useState('');
    const [vidilen, setVidilen] = React.useState([]);
    const [placeVidil, setPlaceVidil] = React.useState("");
    const [loading,setLoading]=useState(false)
    const [text,setText]=useState("")
    const goodCart=useStore(state=>state.goodCart)
    const sendOrder=useStore(state=>state.sendOrder)
    const getPrice=useStore(state=>state.getPrice)
    const telegramId=useStore(state=>state.telegramId)
    const navigation=useNavigate()


    const [open,setOpen]=useState(false)
    const [textAlert,setTectAlert]=useState("")
    const [state,setState]=useState(0)

    const handleSendData= async()=>{
     
      let adre="";
      let gooDate="";
    goodCart.forEach(e=>
        {
          gooDate+=`Назва: ${e.name}  Ціна: ${e.unique_price!=0?e.unique_price:e.cost} К-ть: ${e.count}x \n`

        })
      console.log(gooDate);
      console.log(place);
      switch (place) 
             {
              case 10 :adre='ТЦ "Проспект", оф. № 128А (праворуч від ескалатору)' 
              console.log("!1");
              break;
              case 20:adre='ТРЦ «DEPOt» (2-й поверх)'
              console.log("!2");
              break;
              case 30:
                console.log("!3");
                  adre= adress+" "+vidilen[Number.parseInt(placeVidil)].Description
                
             }
      

      let data={
        name:name,
        phone:phone,
        telegram_id:telegramId,
        cart:gooDate,
        adress:adre,
        sum:getPrice(),
        comment:text

      }
      let flag=await sendOrder(data)
      if(flag){
        setTectAlert("Ваше замовлення принято !!! очікуйте повідомлення про номер замовлення")
        setState(0)

        setOpen(true)
      tg.close()
       setTimeout(()=>{navigation("/")},3000)   
      }else {
        setTectAlert("Виникла помилка при оформленні замовлення будь ласка зв'яжіться із тех. підтримкою")
        setState(1)
        setOpen(true)
      }

    }
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
        async function  fetchData(){
          let p=  await getPhone(user.id)
       
          setPhone(p)
        }
       
       
        fetchData()
      },[])
  return (
    <div className='w-[303px] m-auto border p-9 shadow-md'>

       <AlertCustum open={open} setOpen={setOpen} text={textAlert} state={state}/> 
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
        <Button 
        
        onClick={handleSendData}
        
        sx={{marginTop:3}} variant='outlined' disabled={
    place == "30"
      ? !(name.trim() !== "" && phone.trim() !== "" && adress.trim() !== "")
      : !(name.trim() !== "" && phone.trim() !== "")
  }   >Завершити</Button>
        </div>

    </div>
  )
}
