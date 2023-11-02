import { create } from 'zustand'
import $api from '../http'

export const useStore = create((set) => ({
  shopCart: 1,
  cat:[],
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

}))

