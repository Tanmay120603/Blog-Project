import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import postReducer from "./postSlice"

const store=configureStore({reducer:{
    authSlice:authReducer,
    postSlice:postReducer
}})

export default store