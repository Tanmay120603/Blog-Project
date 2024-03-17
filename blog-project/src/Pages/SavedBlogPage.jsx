import { useEffect, useState } from "react"
import databases from "../appwrite/databaseService"
import { useDispatch, useSelector } from "react-redux"
import { deleteSavedBlog, setAddPostIntialState, setSavedBlogsData } from "../store/postSlice"
import Loader from "../Components/Loader"
import storageService from "../appwrite/storageService"
import Button from "../Components/Button"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import NoPostFound from "../Components/NoPostFound"

function SavedBlogPage(){

    const {authSlice,postSlice}=useSelector(store=>store)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const[isLoading,setIsLoading]=useState(true)

    useEffect(()=>{
        if(postSlice.freshSavedBlogs) return setIsLoading(false)
        databases.getAllPosts().then(data=>{
            dispatch(setSavedBlogsData({data:data.documents,fresh:true,currentId:authSlice.userData.userId}))
        }).finally(()=>setIsLoading(false))
    },[])

    function handleDelete(slugId){
        databases.deletePost(slugId).then(data=>dispatch(deleteSavedBlog(slugId))).catch(error=>toast.error(error.message))
    }

    function handleEdit(postData){
        const {status,title,content,$id,featuredImage}=postData
        navigate("/add/post/")
        dispatch(setAddPostIntialState({status,title,content,featuredImage,slug:$id}))
    }

    function handleView(postData){
        navigate(`/post/${postData.$id}`,{state:postData})
    }

    if(isLoading)return(<div className="py-20"><Loader></Loader></div>)

    if(postSlice.savedBlogs?.length==0)return<NoPostFound></NoPostFound>

    return(
        <div className="w-full max-w-full grid gap-y-8 grid-cols-3 py-20 justify-items-center">
        {postSlice?.savedBlogs?.map(individualPost=><div key={individualPost.$id} className="hover:cursor-pointer">
            <Button eventHandler={()=>handleDelete(individualPost.$id)} text="Delete"></Button>
            <div className="relative group w-[400px] h-[300px] border-4 border-black"><img className="w-full h-full object-cover"  src={storageService.getFilePreview(individualPost.featuredImage)} alt={individualPost.title} />
            <div className="absolute flex items-center justify-center gap-4 top-0 w-full h-full transition-transform duration-300 group-hover:scale-100 bg-black bg-opacity-70 scale-0">
                <Button text="View" stylingClasses="text-white" eventHandler={()=>handleView(individualPost)}></Button>
                <Button stylingClasses="text-white" eventHandler={()=>handleEdit(individualPost)} text="Edit"></Button>
            </div>
            </div>
            <div className="flex gap-2">
            </div>
            <p className="pt-2 text-center">{individualPost.title}</p>
        </div>)}
        <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}pauseOnFocusLoss draggable pauseOnHover theme="light"></ToastContainer>
    </div>
    )
}

export default SavedBlogPage