import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk('/order/createOrder',async (orderData)=>{
   const response = await axios.post(
      "http://localhost:3000/user/order/create",
      orderData
    );
    return response.data;
})

export const getAllOrderByUser = createAsyncThunk(
   '/order/getAllOrderByUser',async (userId)=>{
   const response = await axios.get(
      `http://localhost:3000/user/order/list/${userId}`,
    );
    return response.data;
})

export const getOrderDetails = createAsyncThunk(
   '/order/getOrderDetails',async (id)=>{
   const response = await axios.get(
      `http://localhost:3000/user/order/details/${id}`,
      console.log("API",response.data)
      
    );
    return response.data;
})

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    status: 'idle',
    orderStatus: 'Pending',
    orderDetails: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'confirmed';
        state.orders.push(action.payload.order);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      }).addCase(getAllOrderByUser.pending, (state) => {
         state.isLoading = true;
       })
       .addCase(getAllOrderByUser.fulfilled, (state, action) => {
         state.isLoading = false;
         state.orders = action.payload.data;
       })
       .addCase(getAllOrderByUser.rejected, (state) => {
         state.isLoading = false;
         state.orders = [];
       })
       .addCase(getOrderDetails.pending, (state) => {
         state.isLoading = true;
       })
       .addCase(getOrderDetails.fulfilled, (state, action) => {
         state.isLoading = false;
         state.orderDetails = action.payload.data;
       })
       .addCase(getOrderDetails.rejected, (state) => {
         state.isLoading = false;
         state.orderDetails = null;
       });
  },
});

export default orderSlice.reducer;
