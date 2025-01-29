import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
   isLoading: false,
   productList: []
}

export const fetchAllFilteredProducts = createAsyncThunk('/products/fetchAllFilteredProducts',async ()=>{
   const result = await axios.get(
      "http://localhost:3000/user/products/get",
    );
    return result?.data;
})

const UserProductSlice = createSlice({
   name: 'userProduct',
   initialState,
   reducers: {},
   extraReducers: (builder)=>{
      builder.addCase(fetchAllFilteredProducts.pending, (state, action)=>{
         state.isLoading = true
      }).addCase(fetchAllFilteredProducts.fulfilled, (state, action)=>{
         state.isLoading = false;
         state.productList = action.payload.data;
         // console.log(action.payload.data);
      }).addCase(fetchAllFilteredProducts.rejected, (state, action)=>{
         state.isLoading = false;
         state.productList = [];
      })
   }
})

export default UserProductSlice.reducer;