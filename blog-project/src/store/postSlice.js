import {createSlice} from "@reduxjs/toolkit"

const initialState={allPosts:{allPostData:[],freshAllPosts:false},myPosts:{myPostsData:[],freshMyPosts:false,filterBy:{status:"none"}},individualPostData:null,addPostIntialState:{title:"",content:"",status:"",slug:""}}

const postSlice=createSlice({name:"postSlice",initialState,reducers:{
    setAllPostData(state,action){
        state.allPosts.allPostData=action.payload.data
        state.allPosts.freshAllPosts=action.payload.fresh
    },
    setMyPostsData(state,action){
        state.myPosts.myPostsData=action.payload.data.filter(individualData=>individualData.userId===action.payload.currentId)
        state.myPosts.freshMyPosts=action.payload.fresh
    },
    filterMyPosts(state,action){
        state.myPosts.filterBy=action.payload
    },
    setIndividualPostData(state,action){
        state.individualPostData=action.payload
    },
    deleteMyPost(state,action){
        state.myPosts.myPostsData=state.myPosts.myPostsData.filter(savedBlog=>savedBlog.$id!==action.payload)   
    },
    setAddPostIntialState(state,action){
        state.addPostIntialState=action.payload
    },
}})

export const {setAllPostData,setMyPostsData,filterMyPosts,setIndividualPostData,deleteMyPost,setAddPostIntialState}=postSlice.actions

const postReducer=postSlice.reducer

export default postReducer