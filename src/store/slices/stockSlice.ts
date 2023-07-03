// stockSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { stockUrl } from '../../constants/constants';
import { RootState } from "../store";

type StockState = {
    data: [],
    loading: boolean,
    error: string | null | undefined,
  };
  
  const initialValues: StockState = {
    data: [],
    loading: false,
    error: null,
  };
  


// Async thunk action creator with parameters
export const fetchProducts = createAsyncThunk('stock/loadproducts', async () => {
  const response = await axios.get(`${stockUrl}/product`);
  return response.data;
});

const stockSlice = createSlice({
  name: 'stock',
  initialState: initialValues,
  reducers: {
    // ... other reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});




export const {} = stockSlice.actions;
export const stockSelector = (store: RootState) => store.stockReducer;
export default stockSlice.reducer;
