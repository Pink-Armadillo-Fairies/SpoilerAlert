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
            state.userName=action.payload
            console.log("state:", state);
            console.log("state.loginStatus:", state.loginStatus); 
            console.log("username", state.userName)
        }
    }
})
export const { successfulLogin } = loginSlice.actions;
export default loginSlice.reducer;

