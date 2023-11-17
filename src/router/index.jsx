import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
} from "react-router-dom";
import Cart from "../pages/Cart";
import ShopCart from "../pages/ShopCart";
import Category from "../pages/Category";

import Layout from "../pages/Layout";
import CheckOut from "../pages/CheckOut";
import $api from "../http";
import MyOrders from "../pages/MyOrders";

export const router=createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        loader:async()=>{
          const response=await $api.get("/get-all-cat")
          const data=response.data
          return data
        },
        children:[
            {
              
                index:true,
                element: <Cart/>,
              },
              {
                
                  path: "/category/:id",
                  loader: async ({ params }) => { 
                    const response=await $api.post("/get-all-goods-by-cat",{id_cat:params.id})
                    return response.data
                  },
                  element: <Category/>,
                },
                {
                  path: "/shop-cart/",
                  element: <ShopCart/>,
                },
                {
                  path: "/check-out/",
                  element: <CheckOut/>,
                },
                {
                  path:"/my-orders/",
                  element:<MyOrders/>
                }
        ]
    }
   
  ]);