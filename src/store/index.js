import { create } from 'zustand'
import $api from '../http'

export const useStore = create((set,get) => ({
  shopCart: 0,
  cat:[],
  goodCart:[],
  cartSum:0,
  operators:0,
  telegramId:"",
  loader:false,
  setLoader(val){
    set(state=>({...state,loader:val}))
  },
  setTelegramId(id){
    set(state=>({...state,telegramId:id}))
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
   
    if(dataFromLocalStorage.goodCart.length!=0){
      set(state=>({...state,operators:dataFromLocalStorage.operators,cat:dataFromLocalStorage.cat,shopCart:dataFromLocalStorage.goodCart.length,goodCart:[...dataFromLocalStorage.goodCart]}))
    }
    console.log("Check",dataFromLocalStorage.goodCart);
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

