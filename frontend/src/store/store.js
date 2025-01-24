import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import AdminProductSlice from './admin/productSlice'

const store = configureStore({
   reducer:{
      auth: authReducer,
      adminProducts: AdminProductSlice
   }
});

export default store;