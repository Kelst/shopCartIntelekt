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

export const router=createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                path: "/",
                index:true,
                element: <Cart/>,
              },
              {
                  path: "/category/:id",
                  element: <Category/>,
                },
                {
                  path: "/item/",
                  element: <Item/>,
                },
                {
                  path: "/",
                  element: <ShopCart/>,
                },
        ]
    }
   
  ]);