import { useLocation } from "react-router-dom"
import storageService from "../appwrite/storageService"
import parse from "html-react-parser"

function PostDetailsPage(){
    const data=useLocation().state
    return(
        <div className="flex flex-col items-center gap-1">
            <div className="w-full max-w-full p-2 h-[800px]">
            <img className="border-8 border-black w-full h-full object-cover" src={storageService.getFilePreview(data.featuredImage)} alt={data.title} />
            </div>
            <p className="font-bold text-[36px]">{data.title}</p>
            {parse(data.content)}
        </div>
    )
}

export default PostDetailsPage