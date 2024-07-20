import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  loginStatus: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    //log in successful
    successfulLogin: (state, action) => {
      state.loginStatus = true;
      state.username = action.payload;
      console.log('state:', state);
    },
    failedLogin: (state, action) => {
      state.loginStatus = false;
      state.loginFailedMessage = 'Login failed. Try again';
      console.log('state:', state);
    },
  },
});
export const { successfulLogin, failedLogin } = loginSlice.actions;
export default loginSlice.reducer;
