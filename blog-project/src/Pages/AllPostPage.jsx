import { useEffect, useState } from "react"
import databases from "../appwrite/databaseService"
import { useDispatch, useSelector } from "react-redux"
import { setAllPostData} from "../store/postSlice"
import storageService from "../appwrite/storageService"
import { Link } from "react-router-dom"
import Loader from "../Components/Loader"
import NoPostFound from "../Components/NoPostFound"

function AllPostPage(){

    const [isLoading,setIsLoading]=useState(true)
    const dispatch=useDispatch()
    const postSliceData=useSelector(store=>store.postSlice)
    useEffect(()=>{
        if(postSliceData.allPosts.freshAllPosts) return setIsLoading(false)
        databases.getAllPosts().then(data=>{
        const filteredData=data.documents.filter(individualData=>individualData.status==="active")
        dispatch(setAllPostData({data:filteredData,fresh:true}))
        }).finally(()=>setIsLoading(false))
    },[])

    if(isLoading){
        return (<div className="py-20"><Loader></Loader></div>)
    }

    if(postSliceData.allPosts.allPostData.length==0)return<NoPostFound></NoPostFound>

    return(
        <div className="w-full max-w-full grid-cols-1 grid gap-y-8 xl:grid-cols-3 lg:grid-cols-2 py-20 justify-items-center">
            {postSliceData.allPosts.allPostData.map(individualPost=><Link key={individualPost.$id} to={`/post/${individualPost.$id}`} state={individualPost}><div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
           <div className="max-w-sm h-[200px] hover:cursor-pointer">
               <img className="rounded-t-lg w-full h-full object-cover" src={storageService.getFilePreview(individualPost.featuredImage)} alt={individualPost.title}/>
           </div>
           <div className="p-5">
                   <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{individualPost.title}</h5>
               <p className="mb-3 whitespace-pre-wrap break-words font-normal hover:cursor-text text-gray-700 dark:text-gray-400">{individualPost.content.slice(0,150).replace(/(<([^>]+)>)/ig, '')+"..."}</p>
               <span className="inline-flex items-center px-3 py-2 hover:cursor-pointer text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                   Read more
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2 hover:cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                   </svg>
               </span>
           </div>
       </div></Link>)}
        </div>
    )
}

export default AllPostPage