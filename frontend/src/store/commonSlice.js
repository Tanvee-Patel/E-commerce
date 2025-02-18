import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addFeatureImage = createAsyncThunk('/addProductReview', async (image) => {
   const response = await axios.post(
      'http://localhost:3000/common/feature/add',
      {image}
   );
   return response.data;
})

export const getFeatureImages = createAsyncThunk('/getFeatureImage', async () => {
   const response = await axios.get(
      'http://localhost:3000/common/feature/get',
   );
   return response.data;
})

const commonSlice = createSlice({
   name: 'commonSlice',
   initialState: {
      isLoading: false,
      featureImageList: []
   },
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getFeatureImages.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getFeatureImages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.featureImageList = action.payload.data;
         })
         .addCase(getFeatureImages.rejected, (state) => {
            state.isLoading = false;
            state.reviews = [];
         });
   }
})

export default commonSlice.reducer