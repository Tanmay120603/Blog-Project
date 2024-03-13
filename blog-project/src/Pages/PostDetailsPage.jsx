import { useLocation, useNavigate, useParams } from "react-router-dom"
import storageService from "../appwrite/storageService"
import parse from "html-react-parser"
import { useEffect } from "react"
import databases from "../appwrite/databaseService"
import { useDispatch, useSelector } from "react-redux"
import { setAllPostData,setAddPostIntialState,setIndividualPostData } from "../store/postSlice"
import Loader from "../Components/Loader"
import Button from "../Components/Button"
import { ToastContainer, toast } from "react-toastify"

function PostDetailsPage(){
    const postData=useLocation().state
    const postSlug=useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {postSlice:postValue,authSlice:authValue}=useSelector(store=>store)
    const postDetails=postValue.individualPostData

    useEffect(()=>{
        if(postData)dispatch(setIndividualPostData(postData))
        else databases.getIndividualPost(postSlug.slug).then(data=>dispatch(setIndividualPostData(data)))
    },[])

    function handleDelete(){
        databases.deletePost(postDetails.$id).then(data=>{
            navigate("/posts",{replace:true})
            dispatch(setAllPostData({data:null,fresh:false}))
        }).catch(error=>toast.error(error.message))
    }

    function handleEdit(){
        const {status,title,content,featuredImage,$id}=postDetails
        navigate("/add/post/")
        dispatch(setAddPostIntialState({status,title,content,featuredImage,slug:$id}))
    }

    if(!postDetails)return<Loader></Loader>

    return(
        <div className="flex flex-col items-center gap-1">
            <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}pauseOnFocusLoss draggable pauseOnHover theme="light"></ToastContainer>
            <div className="w-full max-w-full p-2 h-[800px]">
            {postDetails.userId===authValue.userData.userId && <div className="flex gap-2">
            <Button eventHandler={handleDelete} text="Delete"></Button>
            <Button text="Edit" eventHandler={handleEdit}></Button>
            </div>}
            <img className="border-8 border-black w-full h-full object-cover" src={storageService.getFilePreview(postDetails.featuredImage)} alt={postDetails.title} />
            </div>
            <p className="font-bold text-[36px]">{postDetails.title}</p>
            {parse(postDetails.content)}
        </div>
    )
}

export default PostDetailsPage