import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography, getAccordionDetailsUtilityClass } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import { useTelegram } from '../hooks/useTelegram';
import { useStore } from '../store';
import fetchData from '../nova-poshta';
import ButtomCustom from '../components/ButtomCustom';
import AlertCustum from '../components/AlertCustum';
import { useNavigate } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import AnnouncementIcon from '@mui/icons-material/Announcement';
import AlertDialog from '../components/AlertDialog';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CustumeDone from '../components/CustumDone';
function hasRouter(goodCart, cat) {
  for (let i = 0; i < goodCart.length; i++) {
    const id_cat = goodCart[i].id_cat;

    // Знаходимо об'єкт в масиві cat за збігом id
    const catObject = cat.find(item => item.id === id_cat);

    // Перевіряємо, чи є об'єкт і чи в полі name міститься слово 'роутер' (незалежно від регістру)
    if (catObject && catObject.cat.toLowerCase().includes('роутер')) {
      return true;
    }
  }
  // Якщо жоден елемент не відповідає умовам, повертаємо false
  return false;
}
function hasTV(goodCart, cat) {
  for (let i = 0; i < goodCart.length; i++) {
    const id_cat = goodCart[i].id_cat;

    // Знаходимо об'єкт в масиві cat за збігом id
    const catObject = cat.find(item => item.id === id_cat);

    // Перевіряємо, чи є об'єкт і чи в полі name міститься слово 'роутер' (незалежно від регістру)
    if (catObject && catObject.cat.toLowerCase().includes('пристав')) {
      return true;
    }
  }
  // Якщо жоден елемент не відповідає умовам, повертаємо false
  return false;
}
const makerLinksToFastPayEasyPay = (amount, login) => {
  const param = `account=${login}&amount=${amount}&readonly=account`;
  console.log(param);

  const encodedData = btoa(param);
  console.log(encodedData);

  return encodedData;
};
export default function CheckOut() {
    const [name, setName] = React.useState('');
    const [nameWifi, setNameWiFi] = React.useState('');
    const [passWifi, setPassWiFi] = React.useState('');
    const [place, setPlace] = React.useState(10);
    const [wifi,setWifi]=useState(false)
    const [tvIntelekt,setTvIntelekt]=useState(false)
    const [openWifi,setOpenWifi]=useState(false)
    const [phone, setPhone] = React.useState('38');
    const [adress, setAdress] = React.useState('');
    const [vidilen, setVidilen] = React.useState([]);
    const [placeVidil, setPlaceVidil] = React.useState("");
    const [loading,setLoading]=useState(false)
    const [text,setText]=useState("")
    const goodCart=useStore(state=>state.goodCart)
    const sendOrder=useStore(state=>state.sendOrder)
    const getPrice=useStore(state=>state.getPrice)
    const telegramId=useStore(state=>state.telegramId)
    const [price,setPrice]=useState(0)
    const cat=useStore(state=>state.cat)

    const [openAlertDialog,setOpenAlertDialog]=useState(false)
    const [alertTitle,setAlertTitle]=useState("")
    const [alertText,setAlertText]=useState("")

    const navigation=useNavigate()


    const [open,setOpen]=useState(false)
    const [textAlert,setTectAlert]=useState("")
    const [state,setState]=useState(0)
    const [pay,setPay]=useState(false)
    useEffect(()=>{
        if(goodCart.length===0){
          navigation("/")
        }
    },[])
    
    const handleSendData= async()=>{
      
      let adre="";
      let gooDate="";
      
    goodCart.forEach(e=>
        {
          gooDate+=`Назва: ${e.name}  Ціна: ${e.unique_price!=0?e.unique_price:e.cost} К-ть: ${e.count}x \n`

        })
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
        comment: text + '\n' + (wifi ? `WIFI: ${nameWifi}\nPassword: ${passWifi}\n` : '') + (tvIntelekt ? 'Встановити додаток на приставку\n' : '')

      }

      setPrice(data.sum)
   let flag=await sendOrder(data)
      if(flag){
        setTectAlert("Ваше замовлення принято !!! очікуйте повідомлення про номер замовлення")
        setState(0)

        setOpen(true)
     
        if(place==30){
           setPay(true)   
        } else {
          navigation("/")
        }
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
    <div className='max-w-[303px] m-auto border p-9 shadow-md relative  overflow-auto'>
{pay ? <>
  <span className=' uppercase text-lg font-bold'>До оплати : {price} (грн) </span>
  <div class="mb-6">
    <p class="text-sm">При замовленні доставки товару "Новою Поштою" - обов'язкова 100% передоплата замовлення.  Вартість доставки замовлення оплачує покупець, згідно тарифів "Нової Пошти".</p>
   
  </div>
 <Button onClick={()=>{ window.location.href ='https://easypay.ua/ua/partners/intelekt-group/intelekt-group?hash='+makerLinksToFastPayEasyPay(price,'buyer')}} sx={{borderColor:"black",color:"black"}} variant='outlined'>Оплатити </Button>


</>:
<>
       <AlertCustum open={open} setOpen={setOpen} text={textAlert} state={state}/> 
       {/* <div className=' absolute left-[50px] md:left-[80px] cursor-pointer' onClick={()=>setOpen(true)} >
          <LocalPhoneIcon /></div> */}
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
         inputProps={{
          selectionStart: 2, // Задаємо позначку (caret) після двох символів
        }}
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
        
    {
      hasRouter(goodCart,cat)?
      <FormControlLabel  color='secondary' sx={{fontSize:"10px", marginTop:"10px" }} control={<Checkbox  checked={wifi} value={wifi} onClick={()=>setWifi(pre=>!pre)} />} label="Вказати дані для WIFI" />
      :
      ""
    } 
    {
      hasTV(goodCart,cat)?
      <FormControlLabel  sx={{fontSize:"10px", marginTop:"10px" }} control={<Checkbox  checked={tvIntelekt} value={tvIntelekt} onClick={()=>setTvIntelekt(pre=>!pre)} />} label="Встановити Intekekt tv" />
      :
      ""
    } 
        
        {
          wifi?
         <div className=' bg-gray-100 rounded-md flex justify-center py-2 items-center flex-col'>
          <TextField
           label="Назва WIFI"
           onChange={e=>{
            setNameWiFi(e.target.value)
          }}
          variant="standard"
          />
          <TextField
                    sx={{marginTop:3}} 
                    onChange={e=>{
                      setPassWiFi(e.target.value)
                    }}
           label="Пароль WIFI"
          variant="standard"
          />
          </div> :""
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
        <div 
        onClick={()=>{setOpenAlertDialog(true)}}
        className=' animate-pulse cursor-pointer  absolute right-2'>
 <AnnouncementIcon />
 </div>
 <AlertDialog open={openAlertDialog} setOpen={setOpenAlertDialog} title={alertTitle} text={alertText}/>
 </>
}
    </div>
  )
}
