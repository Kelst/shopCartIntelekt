import { create } from 'zustand'
import $api from '../http'

export const useStore = create((set,get) => ({
  shopCart: 0,
  cat:[],
  goodCart:[],
  goodsUnique:[],
  orders:[],
  cartSum:0,
  operators:0,
  telegramId:"",
  catNav:0,
  loader:false,
  shovDynamicsNavigation:false,
  operator2:0,
  countSlide:0,
  index:0,
  flagList:true,
  switchFlagList(flag){
    set(state=>({...state,flagList:flag}))
  },
  async makeCall(phone){
    let resp=await $api.post('/makeCall',{phone:`${phone}`}) 
    console.log("ВІдправлено смс  дзвінок",resp.data);

  },
  async getOrderTelegram (id){
    try {
      set(state=>({...state,loader:true}))
        let data=await $api.post('/get-order-telegram',{id:`${id}`})
        set(state=>({...state,orders:data.data}))
        console.log(data.data,"Orders");

    }
    catch(e){
      console.log(e,"OrderGet");
      
      set(state=>({...state,loader:false,orders:[...state.orders]}))
 
    }
    finally {
      set(state=>({...state,loader:false})) 
    }
   
     

  },

  async sendOrder (order) {
    try {
      set(state=>({...state,loader:true}))
      const response=await $api.post("/create-order",{order:order})
      const data=response.data
      set(state=>({...state,loader:false}))
      if(data.flag==false) return false 
      set(state=>({...state,goodCart:[],shopCart:0}))
      localStorage.removeItem('state');
     return data
    } catch (error) {
      console.log(error,"POMILKA");
      set(state=>({...state,loader:false}))
      return false
    }
  },
  async payDeposit(telegram_id,orderId){
    try {
      const response=await $api.post("/payDeposit",{telegram_id:telegram_id,orderId:orderId})
return true
    }
    catch(e){
      return false
      console.log('erro pay deposit',e);
    }
  },
  async removeOrder () {
    try {
      set(state=>({...state,goodCart:[],shopCart:0}))
      localStorage.removeItem('state');
     return true
    } catch (error) {
      console.log(error);
      return false
    }
  },
  setIndex(index){
    set((state)=>({...state,index:index}))
  },
  setOperator2(){
set(state=>({...state,operator2:state.operator2+1}))
  },
  setAllCat(cats){
set(state=>({...state,cat:cats}))
  },
setShovDynamicsNavigation(flag){
  set(state=>({...state,shovDynamicsNavigation:flag}))
},
setCatNav(id){
  set(state=>({...state,catNav:id}))

},
  setLoader(val){
    set(state=>({...state,loader:val}))
  },
  setTelegramId(id){
    set(state=>({...state,telegramId:`${id}`}))
  },
 async getPhone(id){
try {
  const response=await $api.post("/get-phone",{id:id})
  const data=response.data
  if (data!=false){
    return data
  }else {
    return ""
  }
}
catch (e){

}
  },
  checkLocalStorage(){
    const dataFromLocalStorage=JSON.parse(localStorage.getItem("state"))
    if(!dataFromLocalStorage) return
    try {
      if(dataFromLocalStorage.goodCart.length!=0){
        set(state=>({...state,catNav:dataFromLocalStorage.catNav,operators:dataFromLocalStorage.operators,shopCart:dataFromLocalStorage.goodCart.length,goodCart:[...dataFromLocalStorage.goodCart]}))
      }
      console.log("Check",dataFromLocalStorage.goodCart);
    }
    catch(e){
console.log("ERROR CHEckLOcal ",e);
    }

  },
  async getAllCat () {
  
    try {
      const response=await $api.get("/get-all-cat")
      const data=response.data
      console.log(data);
      set(state=>({...state,cat:[...data]}))
    } catch (error) {
      console.log(error);
      
    }
  },
  async getGoods (id_cat) {
    try {
      set(state=>({...state,loader:true}))
      const response=await $api.post("/get-all-goods-by-cat",{id_cat:id_cat})
      const data=response.data
      set(state=>({...state,loader:false}))
     return data
    } catch (error) {
      console.log(error);
      set(state=>({...state,loader:false}))
    }
  },
  async getLogin (idTelegram) {
    const phone=await get().getPhone(idTelegram)
    try {
      set(state=>({...state,loader:true}))
      const response=await $api.post("/get-login",{id:idTelegram,phone:phone})
      const data=response.data
      set(state=>({...state,loader:false}))
     return data
    } catch (error) {
      console.log(error);
      set(state=>({...state,loader:false}))
    }
  },
  async getDeposit(telegram_id,sum){
    try {
      const response=await $api.post("/get-deposit",{telegram_id:telegram_id,sum:sum})
      const data=response.data
        return data
    }
    catch (e){
    return false
    }
      },
  async getGoodsUniques () {
    try {
      set(state=>({...state,loader:true}))
      const response=await $api.get("/get-all-goods_unique")
      const data=response.data
      set(state=>({...state,goodsUnique:data,loader:false}))
     return data
    } catch (error) {
      console.log(error);
      set(state=>({...state,loader:false}))
    }
  },
  addToCart(good) {
    set(state => {
      const existingGood = state.goodCart.find(item => (item.id === good.id&&item.id_cat===good.id_cat));
  
      if (existingGood) {
        // Товар вже є в кошику, збільшуємо лічильник
        existingGood.count = (existingGood.count || 0) + 1;
      } else {
        // Товару ще немає в кошику, додаємо його з лічильником 2
        good.count = 1;
        state.goodCart.push(good);
      }
  
      return {
        ...state,
        shopCart: state.goodCart.length ,
        goodCart: [...state.goodCart],
        operators:state.operators+1
      };
    });
  
    // Зберігаємо оновлений стан у localStorage
    localStorage.setItem("state", JSON.stringify(get()));
    
    console.log(get().goodCart, "Add");
  },
   removeFromCart(good) {
  const id_cat = good.id_cat;
  const id = good.id;

  console.log(get().goodCart);
  console.log(id_cat, id);

  const updatedGoodCart = get().goodCart.map(item => {
    if (item.id === id && item.id_cat === id_cat) {
      if (item.count === 1) {
        return null; // Видаляємо товар, якщо count === 1
      } else {
        return { ...item, count: item.count - 1 };
      }
    }
    return item;
  })

  const newGoodCart = updatedGoodCart.filter(item => item !== null);

  console.log(newGoodCart);

  set(state => ({
    ...state,
    shopCart: newGoodCart.length,
    goodCart: [...newGoodCart],
    operators:state.operators-1

  }));
  
  localStorage.removeItem('state');
  localStorage.setItem("state", JSON.stringify(get()));
}
,

removeFromCartShop(good) {
  const id_cat = good.id_cat;
  const id = good.id;
  const updatedGoodCart = get().goodCart.map(item => {
    if (item.id === id && item.id_cat === id_cat) {
  return null
    }
    return item;
  })

  const newGoodCart = updatedGoodCart.filter(item => item !== null);

  console.log(newGoodCart);

  set(state => ({
    ...state,
    shopCart: newGoodCart.length,
    goodCart: [...newGoodCart],
    operators:state.operators-1

  }));
  
  localStorage.removeItem('state');
  localStorage.setItem("state", JSON.stringify(get()));
}


,
  cheCkGoodInCart(good){
   
    const id_cat=good.id_cat 
    const id=good.id
    let isGoodInCart=false
    get().goodCart.forEach(e=>{
        if(e.id==id&&id_cat==e.id_cat){
          isGoodInCart=true
        }
    })

   return isGoodInCart
  },
  getPrice(){
    
    let price=0
    price=get().goodCart.reduce((totalCost, object) => {
        let un=object.unique_price!=0?object.unique_price*object.count:object.cost*object.count
        
      return totalCost + (un || 0);
    }, 0);
    return price
  }


}))

