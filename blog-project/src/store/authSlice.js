import {createSlice} from "@reduxjs/toolkit"

const initialState={
    loggedIn:false,
    userData:null
}

const authSlice=createSlice({name:"authSlice",initialState,reducers:{
    login(state,action){
        state.loggedIn=true
        const userId=action.payload.userId ? action.payload.userId : action.payload.$id
        state.userData={userId}
    },
    logout(state){
        state.loggedIn=false
        state.userData=null
    }   
}})

export const {login,logout}=authSlice.actions

const authReducer=authSlice.reducer

export default authReducer