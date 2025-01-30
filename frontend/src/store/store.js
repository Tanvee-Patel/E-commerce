import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import AdminProductSlice from './admin/productSlice'
import UserProductSlice from './user/productSlice'
import userCartSlice from './user/cartSlice'

const store = configureStore({
   reducer:{
      auth: authReducer,
      adminProducts: AdminProductSlice,
      userProducts: UserProductSlice,
      userCart: userCartSlice
   }
});

export default store;