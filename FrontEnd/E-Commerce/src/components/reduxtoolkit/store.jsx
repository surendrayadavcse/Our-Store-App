import { configureStore } from "@reduxjs/toolkit";
import productreducer from "./productsSlice"
// import cartSlice from "./cartSlice";
import cartreducer from "./cartSlice"
export const store=configureStore({
    reducer:{
        products:productreducer,
        cart:cartreducer
    }
   
})