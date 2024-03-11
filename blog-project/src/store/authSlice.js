import {createSlice} from "@reduxjs/toolkit"

const initialState={
    loggedIn:false,
    userData:null
}

const authSlice=createSlice({name:"authSlice",initialState,reducers:{
    login(state,action){
        state.loggedIn=true
        state.userData=action.payload
    },
    logout(state){
        state.loggedIn=false
        state.userData=null
    }   
}})

export const {login,logout}=authSlice.actions

const authReducer=authSlice.reducer

export default authReducer