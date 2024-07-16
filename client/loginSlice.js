import { createSlice } from '@reduxjs/toolkit';


const initialState =  {
    userName: '',
    userPassword: '',
    loginStatus: false,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        //log in successful
        successfulLogin: (state, action) => {
            console.log(state)
            state.loginStatus = true;
            console.log("state:", state);
            console.log("state.loginStatus:", state.loginStatus);
        }
    }
})
export const { successfulLogin } = loginSlice.actions;
export default loginSlice.reducer;

