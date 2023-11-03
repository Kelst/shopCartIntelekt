import { create } from 'zustand'
import $api from '../http'

export const useStore = create((set,get) => ({
  shopCart: 0,
  cat:[],
  goodCart:[],

  checkLocalStorage(){
    const dataFromLocalStorage=JSON.parse(localStorage.getItem("state"))
    if(dataFromLocalStorage.shopCart!=0){
      set(state=>({...state,shopCart:dataFromLocalStorage.shopCart}))
    }
    if(dataFromLocalStorage.goodCart.length!=0){
      set(state=>({...state,goodCart:dataFromLocalStorage.goodCart}))
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
      const response=await $api.post("/get-all-goods-by-cat",{id_cat:id_cat})
      const data=response.data
     return data
    } catch (error) {
      console.log(error);
      
    }
  },
  addToCart(good){

      set(state=>({...state,shopCart:state.shopCart+1,goodCart:[...state.goodCart,good]}))
      localStorage.setItem("state",JSON.stringify(get()))
  },
  removeFromCart(good){
    const id_cat=good.id_cat
    const id=good.id
    const goodCartNew=get().goodCart.filter(e=>{
      if(e.id!=id && e.id_cat!=id_cat){
        return e
      }
    })

      set(state=>({...state,shopCart:state.shopCart-1,goodCart:goodCartNew}))
      localStorage.setItem("state",JSON.stringify(get()))

  },
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
    [].red
    let price=0
    price=get().goodCart.reduce((totalCost, object) => {
      return totalCost + ((object.unique_price!=0?object.unique_price:false)||object.cost || 0);
    }, 0);
    return price
  }


}))

