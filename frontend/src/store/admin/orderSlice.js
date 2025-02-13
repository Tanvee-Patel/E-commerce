import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllOrderOfAllUsers = createAsyncThunk(
   '/order/getAllOrderByUser', async () => {
      const response = await axios.get(
         `http://localhost:3000/admin/order/get-orders`,
      );
      return response.data;
   })

export const getAdminOrderDetails = createAsyncThunk(
   '/order/getOrderDetails', async (id) => {
      const response = await axios.get(
         `http://localhost:3000/admin/order/details/${id}`);
      return response.data;
   })

   export const updateOrderStatus = createAsyncThunk(
      '/order/updateOrderStatus', async ({id, orderStatus}) => {
         const response = await axios.put(
            `http://localhost:3000/admin/order/update/${id}`,{orderStatus});
         return response.data;
      })

const AorderSlice = createSlice({
   name: 'adminOrderSlice',
   initialState: {
      orders: [],
      orderDetails: null
   },
   reducers: {
      resetOrderDetails: (state) =>{
         state.orderDetails = null
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(getAllOrderOfAllUsers.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getAllOrderOfAllUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload.data;
         })
         .addCase(getAllOrderOfAllUsers.rejected, (state) => {
            state.isLoading = false;
            state.orders = [];
         })
         .addCase(getAdminOrderDetails.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getAdminOrderDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderDetails = {
               ...action.payload.data,
               addressInfo: action.payload.data.addressInfo || {},
            };
         })
         .addCase(getAdminOrderDetails.rejected, (state) => {
            state.isLoading = false;
            state.orderDetails = null;
         });
   },
});

export const { resetOrderDetails } = AorderSlice.actions;

export default AorderSlice.reducer