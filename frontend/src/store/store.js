import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import AdminProductSlice from './admin/productSlice'
import UserProductSlice from './user/productSlice'
import userCartSlice from './user/cartSlice'
import addressSlice from './user/addressSlice'
import orderSlice from './user/orderSlice'
import AorderSlice from './admin/orderSlice'
import userSearchSlice from './user/searchSlice'
import userReviewSlice from './user/reviewSlice'
import commonFeatureSlice from "./commonSlice"

const store = configureStore({
   reducer:{
      auth: authReducer,
      adminProducts: AdminProductSlice,
      userProducts: UserProductSlice,
      userCart: userCartSlice,
      userAddress: addressSlice,
      orders: orderSlice,
      adminOrders: AorderSlice,
      userSearch: userSearchSlice,
      userReview: userReviewSlice,
      commonFeature: commonFeatureSlice
   }
});

export default store;