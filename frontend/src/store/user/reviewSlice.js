import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProductReview = createAsyncThunk('/addProductReview', async (reviewData) => {
   const response = await axios.post(
      'http://localhost:3000/user/review/add',
      reviewData
   );
   return response.data;
})

export const getProductReviews = createAsyncThunk('/getProductReviews', async (productId) => {
   const response = await axios.get(
      `http://localhost:3000/user/review/${productId}`,
   );
   return response.data;
})

const ReviewSlice = createSlice({
   name: 'reviewSlice',
   initialState: {
      isLoading: false,
      reviews: []
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getProductReviews.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getProductReviews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.reviews = action.payload.data;
         })
         .addCase(getProductReviews.rejected, (state) => {
            state.isLoading = false;
            state.reviews = [];
         });
   }
})

export default ReviewSlice.reducer