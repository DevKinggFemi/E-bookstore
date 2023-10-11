import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState: {
       currentUser : null,
       isFetching : false,
       error : false
    },
    reducers: {
      loginStart: (state)=> {
        state.isFetching = true;
        state.error = false;
      },
      loginSuccess: (state, action)=>{
        state.isFetching = false;
        state.currentUser = action.payload;
      },
      loginFailure:(state,action) => {
        state.isFetching = false;
        state.error = true;
      },
      logOut: (state)=>{
        state.isFetching = false;
        state.currentUser = null;
      } ,
      registerSuccess: (state, action)=>{
        state.isFetching = false;
        state.currentUser = action.payload;
      } 
      
        }
    
})
export const {loginFailure, loginStart,logOut, loginSuccess, registerSuccess} = userSlice.actions;
export const  user=  ((state)=>state.user.currentUser);
export default  userSlice.reducer;