import {createSlice} from "@reduxjs/toolkit"

const initialState={allPostData:null,fresh:false}

const postSlice=createSlice({name:"postSlice",initialState,reducers:{
    setAllPostData(state,action){
        state.allPostData=action.payload.data
        state.fresh=action.payload.fresh
    }
}})

export const {setAllPostData}=postSlice.actions

const postReducer=postSlice.reducer

export default postReducer