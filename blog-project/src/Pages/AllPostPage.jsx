import { useEffect, useState } from "react"
import databases from "../appwrite/databaseService"
import { useDispatch, useSelector } from "react-redux"
import { setAllPostData } from "../store/postSlice"
import storageService from "../appwrite/storageService"
import { Link } from "react-router-dom"

function AllPostPage(){

    const [isLoading,setIsLoading]=useState(true)
    const dispatch=useDispatch()
    const postSliceData=useSelector(store=>store.postSlice)
    useEffect(()=>{
        if(postSliceData.fresh) return setIsLoading(false)
        databases.getAllPosts().then(data=>dispatch(setAllPostData({data:data.documents,fresh:true}))).finally(()=>setIsLoading(false))
    },[])

    if(isLoading){
        return <div>Loading...</div>
    }

    return(
        <div className="w-full max-w-full grid gap-y-8 grid-cols-3 pt-3 justify-items-center">
            {postSliceData.allPostData.map(individualPost=><Link key={individualPost.$id} to={`/post/${individualPost.$id}`} state={individualPost}><div className="hover:cursor-pointer">
                <div className="w-[400px] h-[300px] border-4 border-black"><img className="w-full h-full object-cover"  src={storageService.getFilePreview(individualPost.featuredImage)} alt={individualPost.title} /></div>
                <p className="pt-2 text-center">{individualPost.title}</p>
            </div></Link>)}
        </div>
    )
}

export default AllPostPage