import { useEffect, useState } from "react"
import databases from "../appwrite/databaseService"
import { useDispatch, useSelector } from "react-redux"
import { deleteMyPost, filterMyPosts, setAddPostIntialState, setMyPostsData } from "../store/postSlice"
import Loader from "../Components/Loader"
import storageService from "../appwrite/storageService"
import Button from "../Components/Button"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import NoPostFound from "../Components/NoPostFound"
import getFilteredData from "../utils/getFilteredData"


function MyPostPage(){

    const {authSlice,postSlice}=useSelector(store=>store)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const[isLoading,setIsLoading]=useState(true)

    const filteredPostData=getFilteredData(postSlice.myPosts.myPostsData,postSlice.myPosts.filterBy)

    useEffect(()=>{
        if(postSlice.myPosts.freshMyPosts) setIsLoading(false)
        else databases.getAllPosts().then(data=>{
            dispatch(setMyPostsData({data:data.documents,fresh:true,currentId:authSlice.userData.userId}))
        }).finally(()=>setIsLoading(false))
        return ()=>dispatch(filterMyPosts({status:"none"}))
    },[])

    function handleDelete(slugId){
        databases.deletePost(slugId).then(data=>dispatch(deleteMyPost(slugId))).catch(error=>toast.error(error.message))
    }

    function handleEdit(postData){
        const {status,title,content,$id,featuredImage}=postData
        navigate("/add/post/")
        dispatch(setAddPostIntialState({status,title,content,featuredImage,slug:$id}))
    }

    function handleView(postData){
        navigate(`/post/${postData.$id}`,{state:postData})
    }

    function handleFilter(e){
        dispatch(filterMyPosts({[e.target.name]:e.target.value}))
    }

    if(isLoading)return(<div className="py-20"><Loader></Loader></div>)

    if(postSlice.myPosts.myPostsData.length==0)return<NoPostFound></NoPostFound>

    return(
        <>
    <div className="w-full flex justify-center">
        <div className="mt-16 w-1/2">
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-center">Filter post</h3>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center ps-3">
                        <input id="horizontal-list-radio-license" type="radio" defaultChecked={true} onChange={handleFilter} value="none" name="status" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">All</label>
                    </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center ps-3">
                        <input id="horizontal-list-radio-id" type="radio" onChange={handleFilter} value="active" name="status" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label htmlFor="horizontal-list-radio-id" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active</label>
                    </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center ps-3">
                        <input id="horizontal-list-radio-military" type="radio" onChange={handleFilter} value="inactive" name="status" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                        <label htmlFor="horizontal-list-radio-military" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Inactive</label>
                    </div>
                </li>
            </ul>
        </div>
    </div>
        <div className="w-full max-w-full mt-10 grid grid-cols-1 gap-y-3 md:grid-cols-2 md:gap-y-6 xl:gap-y-8 xl:grid-cols-3 justify-items-center">
        {filteredPostData.map(individualPost=><div key={individualPost.$id} className="flex flex-col gap-2">
            <div className="w-[320px] md:w-[400px] h-[220px] md:h-[300px] border-4 border-black"><img className="w-full h-full object-cover"  src={storageService.getFilePreview(individualPost.featuredImage)} alt={individualPost.title} />
            </div>
            <div className="w-full max-w-full flex justify-between">
            <Button eventHandler={()=>handleDelete(individualPost.$id)} stylingClasses="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700" text="Delete"></Button>
                <Button text="View" stylingClasses="text-white rounded py-2 px-10 bg-blue-700 hover:bg-blue-900" eventHandler={()=>handleView(individualPost)}></Button>
                <Button stylingClasses="text-white rounded py-2 px-10 bg-blue-700 hover:bg-blue-900" eventHandler={()=>handleEdit(individualPost)} text="Edit"></Button>
                </div>
                <p className="pt-2 text-center">{individualPost.title}</p>
        </div>)}
        <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}pauseOnFocusLoss draggable pauseOnHover theme="light"></ToastContainer>
    </div>
    </>
    )
}

export default MyPostPage