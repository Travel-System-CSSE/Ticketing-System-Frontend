import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

//Get User from LocalStorage
const user = JSON.parse(localStorage.getItem('user'))


const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}
//user login
export const login = createAsyncThunk('user/login', async (user, thunkAPI) => {
    try {
      return await authService.login(user)
    } catch (error) {
      console.log("err",error)
      const message = error.response.data.msg || error.message
      return thunkAPI.rejectWithValue(message)
    }
});
//user logout
export const logout = createAsyncThunk('user/logout', async () => {
    console.log('here at authslice')
    authService.logout()
    
});

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = false
        state.message = ''
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.user = null
        })
        .addCase(logout.fulfilled, (state) => {
          state.user = null
        })
    },
  })
  
  export const { reset } = authSlice.actions
  export default authSlice.reducer
  
