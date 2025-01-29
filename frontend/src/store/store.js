import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import AdminProductSlice from './admin/productSlice'
import UserProductSlice from './user/productSlice'

const store = configureStore({
   reducer:{
      auth: authReducer,
      adminProducts: AdminProductSlice,
      userProducts: UserProductSlice
   }
});

export default store;