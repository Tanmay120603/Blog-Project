import { useLocation, useNavigate, useParams } from "react-router-dom"
import storageService from "../appwrite/storageService"
import parse from "html-react-parser"
import { useEffect } from "react"
import databases from "../appwrite/databaseService"
import { useDispatch, useSelector } from "react-redux"
import { setIndividualPostData } from "../store/postSlice"
import Spinner from "../Components/Spinner"

function PostDetailsPage(){
    const postData=useLocation().state
    const postSlug=useParams()
    const dispatch=useDispatch()
    const postValue=useSelector(store=>store.postSlice)
    const postDetails=postValue.individualPostData

    useEffect(()=>{
        if(postData)dispatch(setIndividualPostData(postData))
        else databases.getIndividualPost(postSlug.slug).then(data=>dispatch(setIndividualPostData(data)))
    },[])

    if(!postDetails)return<Spinner></Spinner>

    return(
        <div className="flex flex-col items-center gap-1 mt-16">
            <div className="lg:w-full lg:max-w-full px-4 md:px-6 lg:px-8 lg:h-[700px] relative">
            <img className="border-8 border-black w-full h-full object-cover" src={storageService.getFilePreview(postDetails.featuredImage)} alt={postDetails.title} />
            </div>
            <p className="font-bold text-[36px] text-center">{postDetails.title}</p>
            <div className="w-[90%] whitespace-pre-wrap break-words text-justify flex flex-col items-center mt-4 mb-2">
            {parse(postDetails.content)}
            </div>
        </div>
    )
}

export default PostDetailsPage