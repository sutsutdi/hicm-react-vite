import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";



type LoginState = {
  success: boolean;
  user: string | null;
};

const initialValues: LoginState = {
  success: false,
  user: null,
};


const loginSlice = createSlice({
  name: "login",
  initialState: initialValues,
  reducers: {
    loginStatus: (state, action) => {
      const { success, user } = action.payload;
      state.success = success;
      state.user = user;
    },
  },
  extraReducers: (builder) => {
   
  },
});

export const {loginStatus} = loginSlice.actions;
export const loginSelector = (store: RootState) => store.loginReducer;
export default loginSlice.reducer;
