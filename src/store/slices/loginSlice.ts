import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import axios from 'axios'

type LoginState = {
  loading: boolean
  error: string | undefined
  success: boolean
  user: string | null
}

const initialValues: LoginState = {
  loading: false,
  error: "",
  success: false,
  user: null,
}

type LoginInput = {
  username: string | null
  password: string | null
}

const apiBackendUrl = import.meta.env.VITE_API_BACKEND_URL
const loginUrl = `${apiBackendUrl}/api/v2/authen/login`

// Async thunk action creator with parameters
export const fetchLogin = createAsyncThunk(
  'login/loggedin',
  async (loginInput: LoginInput) => {
    const response = await axios.post(`${loginUrl}`, loginInput)
    return response.data
  }
)

const loginSlice = createSlice({
  name: 'login',
  initialState: initialValues,
  reducers: {
    loginStatus: (state, action) => {
      const { success, user } = action.payload
      state.success = success
      state.user = user
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false
        state.success = action.payload.result === 'ok'? true : false
        state.user = action.payload.result === 'ok'? "username" : ""
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { loginStatus } = loginSlice.actions
export const loginSelector = (store: RootState) => store.loginReducer
export default loginSlice.reducer
