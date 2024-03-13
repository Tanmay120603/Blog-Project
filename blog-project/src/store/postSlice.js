import {createSlice} from "@reduxjs/toolkit"

const initialState={allPostData:null,freshAllPosts:false,savedBlogs:null,freshSavedBlogs:false,individualPostData:null,addPostIntialState:{title:"",content:"",status:"",slug:""}}

const postSlice=createSlice({name:"postSlice",initialState,reducers:{
    setAllPostData(state,action){
        state.allPostData=action.payload.data
        state.freshAllPosts=action.payload.fresh
    },
    setSavedBlogsData(state,action){
        state.savedBlogs=action.payload.data.filter(individualData=>individualData.status==="inactive" && individualData.userId===action.payload.currentId)
        state.freshSavedBlogs=action.payload.fresh
    },
    setIndividualPostData(state,action){
        state.individualPostData=action.payload
    },
    deleteSavedBlog(state,action){
        state.savedBlogs=state.savedBlogs.filter(savedBlog=>savedBlog.$id!==action.payload)   
    },
    setAddPostIntialState(state,action){
        state.addPostIntialState=action.payload
    }
}})

export const {setAllPostData,setSavedBlogsData,setIndividualPostData,deleteSavedBlog,setAddPostIntialState}=postSlice.actions

const postReducer=postSlice.reducer

export default postReducer