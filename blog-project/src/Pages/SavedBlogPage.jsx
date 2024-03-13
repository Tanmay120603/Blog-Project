import { useEffect, useState } from "react"
import databases from "../appwrite/databaseService"
import { useDispatch, useSelector } from "react-redux"
import { deleteSavedBlog, setAddPostIntialState, setSavedBlogsData } from "../store/postSlice"
import Loader from "../Components/Loader"
import storageService from "../appwrite/storageService"
import Button from "../Components/Button"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function SavedBlogPage(){

    const {authSlice,postSlice}=useSelector(store=>store)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const[isLoading,setIsLoading]=useState(true)

    useEffect(()=>{
        if(postSlice.freshSavedBlogs) return setIsLoading(false)
        databases.getAllPosts().then(data=>{
            const currentUserId=authSlice.userData.userId ? authSlice.userData.userId : authSlice.userData.$id
            dispatch(setSavedBlogsData({data:data.documents,fresh:true,currentId:currentUserId}))
        }).finally(()=>setIsLoading(false))
    },[])

    function handleDelete(slugId){
        databases.deletePost(slugId).then(data=>dispatch(deleteSavedBlog(slugId))).catch(error=>toast.error(error.message))
    }

    function handleClick(postData){
        const {status,title,content,$id}=postData
        navigate("/add/post/")
        dispatch(setAddPostIntialState({status,title,content,slug:$id}))
    }

    if(isLoading)return<Loader></Loader>

    if(postSlice.savedBlogs?.length==0)return<p>No Save</p>

    return(
        <div className="w-full max-w-full grid gap-y-8 grid-cols-3 pt-3 justify-items-center">
        {postSlice?.savedBlogs?.map(individualPost=><div key={individualPost.$id} onClick={()=>handleClick(individualPost)} className="hover:cursor-pointer">
            <Button eventHandler={()=>handleDelete(individualPost.$id)} text="Delete"></Button>
            <div className="w-[400px] h-[300px] border-4 border-black"><img className="w-full h-full object-cover"  src={storageService.getFilePreview(individualPost.featuredImage)} alt={individualPost.title} /></div>
            <div className="flex gap-2">
            </div>
            <p className="pt-2 text-center">{individualPost.title}</p>
        </div>)}
        <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}pauseOnFocusLoss draggable pauseOnHover theme="light"></ToastContainer>
    </div>
    )
}

export default SavedBlogPage