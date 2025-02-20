import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

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
   '/order/updateOrderStatus', async ({ id, orderStatus }) => {
      const response = await axios.put(
         `http://localhost:3000/admin/order/update/${id}`, { orderStatus });
      if (response.data.success) {
         if (orderStatus.toLowerCase() === "confirmed") {
            toast.success("Confirmation email sent to the customer!");
         }
      }
      return response.data;
   })

export const sendOrderEmail = createAsyncThunk(
   '/order/sendOrderEmail', async ({ email, orderId, status}) => {
      const response = await axios.post(
         "http://localhost:3000/admin/order/send-mail", {
         email,
         orderId,
         status
      })
      if (response.data.success) {
         toast.success("email sent successfully")
      }
      else {
         toast.error("Failed to send email")
      }
      return response.data;
   })

const AorderSlice = createSlice({
   name: 'adminOrderSlice',
   initialState: {
      orders: [],
      orderDetails: null
   },
   reducers: {
      resetOrderDetails: (state) => {
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
         })
         .addCase(updateOrderStatus.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateOrderStatus.fulfilled, (state, action) => {
            state.isLoading = false;
            const updatedOrder = action.payload.data;
            state.orders = state.orders.map(order =>
               order._id === updatedOrder._id ? updatedOrder : order
            );
         })
         .addCase(updateOrderStatus.rejected, (state) => {
            state.isLoading = false;
         })
         .addCase(sendOrderEmail.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(sendOrderEmail.fulfilled, (state) => {
            state.isLoading = false;
         })
         .addCase(sendOrderEmail.rejected, (state) => {
            state.isLoading = false;
         });
   },
});

export const { resetOrderDetails } = AorderSlice.actions;

export default AorderSlice.reducer