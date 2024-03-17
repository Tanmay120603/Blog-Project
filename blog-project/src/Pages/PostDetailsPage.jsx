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
import { buttonStylingTailwindClasses } from "../utils/constants"

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
        <div className="flex flex-col items-center gap-1 mt-16">
            <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}pauseOnFocusLoss draggable pauseOnHover theme="light"></ToastContainer>
            {postDetails.userId===authValue.userData.userId && <div className="flex gap-2 self-end px-8">
            <Button eventHandler={handleDelete} stylingClasses="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700" text="Delete"></Button>
            <Button text="Edit" stylingClasses="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700" eventHandler={handleEdit}></Button>
            </div>}
            <div className="w-full max-w-full px-8 h-[800px] relative">
            <img className="border-8 border-black w-full h-full object-cover" src={storageService.getFilePreview(postDetails.featuredImage)} alt={postDetails.title} />
            </div>
            <p className="font-bold text-[36px]">{postDetails.title}</p>
            <div className="w-[90%] flex flex-col items-center mt-4 mb-2">
            {parse(postDetails.content)}
            </div>
        </div>
    )
}

export default PostDetailsPage