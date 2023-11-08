import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
} from "react-router-dom";
import Cart from "../pages/Cart";
import ShopCart from "../pages/ShopCart";
import Category from "../pages/Category";
import Item from "../pages/Item";
import Layout from "../pages/Layout";
import CheckOut from "../pages/CheckOut";

export const router=createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
              
                index:true,
                element: <Cart/>,
              },
              {
                  path: "/category/:id",
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
        ]
    }
   
  ]);