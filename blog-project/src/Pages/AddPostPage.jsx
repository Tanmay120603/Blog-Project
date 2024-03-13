import { useDispatch, useSelector } from "react-redux"
import Input from "../Components/Input"
import RealTimeEditor from "../Components/RealTimeEditor"
import storageService from "../appwrite/storageService"
import {addPostConstants} from "../utils/inputDataConstants" 
import { useEffect, useRef, useState } from "react"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import databases from "../appwrite/databaseService"
import Button from "../Components/Button"
import { useNavigate } from "react-router-dom"
import Compressor from 'compressorjs'
import { setAddPostIntialState, setAllPostData, setSavedBlogsData } from "../store/postSlice"

function AddPostPage(){

    const dispatch=useDispatch()
    const [isLoading,setIsLoading]=useState(false)
    const {authSlice:authValue,postSlice}=useSelector(store=>store)
    const [enteredPostData,setEnteredPostData]=useState(postSlice.addPostIntialState)
    const navigate=useNavigate()

    useEffect(()=>{
        return function(){
            dispatch(setAddPostIntialState({title:"",featuredImage:"",content:"",status:"",slug:""}))
        }
    },[])

    async function handleSubmit(e){
        setIsLoading(true)
        e.preventDefault()
        const blogDataToSave={title:enteredPostData.title,status:enteredPostData.status,content:enteredPostData.content,userId:authValue.userData.userId}
        const databaseOperation=postSlice.addPostIntialState.slug ? databases.updatePost : databases.createPost

        try{
            if(postSlice.addPostIntialState.featuredImage){ 
                await storageService.deleteFile(postSlice.addPostIntialState.featuredImage)
            }
            const data=await storageService.uploadFile(enteredPostData.compressedImage)
            blogDataToSave.featuredImage=data.$id
        }
        catch(e){
           setIsLoading(false)
           return toast.error(e.message)
        }
        try{
            const data=await databaseOperation.call(databases,[enteredPostData.slug,blogDataToSave])
            navigate(`/post/${data.$id}`,{state:data})
            dispatch(setAllPostData({data:null,fresh:false}))
            dispatch(setSavedBlogsData({data:[],fresh:false}))
        }
        catch(e){
            return toast.error(e.message)
        }
        finally{
            setIsLoading(false)
        }
    }

    function handleChange(e){
        if(!e.target)return setEnteredPostData({...enteredPostData,content:e})
        if(e.target.name==="title"){
            const slugValue=e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            setEnteredPostData({...enteredPostData,[e.target.name]:e.target.value,slug:slugValue})
        }
        else setEnteredPostData({...enteredPostData,[e.target.name]:e.target.value})
    }

    function handleCompression(e){
        new Compressor(e.target.files[0], {      
            quality: 0.6,
            mimeType:"image/jpeg",
            success: (compressedResult) => {
                const compressedFile=new File([compressedResult],"compressedFile")
                setEnteredPostData({...enteredPostData,compressedImage:compressedFile})
            },
          })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                {!postSlice.addPostIntialState.slug &&
                addPostConstants.map(individualPost=><Input value={enteredPostData[individualPost.name]} eventHandler={handleChange} key={individualPost.id} {...individualPost}></Input>)
                }
                <Input type="file" eventHandler={handleCompression} isRequired={true} label="Select Featured Image" name="featuredImage"></Input>
                <RealTimeEditor eventHandler={handleChange} value={enteredPostData.content}></RealTimeEditor>
                <select name="status" defaultValue={enteredPostData.status} required={true} onChange={handleChange}>
                    <option value="" hidden>Please choose an option</option>
                    <option value="active">Publish to All Posts</option>
                    <option value="inactive">Save to saved blogs</option>
                </select>
                <Button disabled={isLoading} loading={isLoading} text="Submit"></Button>
            </form>
            <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}pauseOnFocusLoss draggable pauseOnHover theme="light"></ToastContainer>
        </div>
    )   
}

export default AddPostPage