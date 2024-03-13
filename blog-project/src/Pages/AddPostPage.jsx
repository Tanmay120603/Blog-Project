import { useDispatch, useSelector } from "react-redux"
import Input from "../Components/Input"
import RealTimeEditor from "../Components/RealTimeEditor"
import storageService from "../appwrite/storageService"
import {addPostConstants} from "../utils/inputDataConstants" 
import { useRef, useState } from "react"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import databases from "../appwrite/databaseService"
import Button from "../Components/Button"
import { useNavigate } from "react-router-dom"
import { setAllPostData, setSavedBlogsData } from "../store/postSlice"

function AddPostPage(){

    const dispatch=useDispatch()
    const imageRef=useRef()
    const quillRef=useRef()
    const [isLoading,setIsLoading]=useState(false)
    const {authSlice:authValue,postSlice}=useSelector(store=>store)
    const [enteredPostData,setEnteredPostData]=useState(postSlice.addPostIntialState)
    const navigate=useNavigate()

    async function handleSubmit(e){
        setIsLoading(true)
        const userId=authValue.userData.userId ? authValue.userData.userId : authValue.userData.$id
        const blogDataToSave={title:enteredPostData.title,status:enteredPostData.status,content:quillRef.current.value,userId:userId}
        e.preventDefault()
        try{
            const data=await storageService.uploadFile(imageRef.current.files[0])
            blogDataToSave.featuredImage=data.$id
        }
        catch(e){
           setIsLoading(false)
           return toast.error(e.message)
        }
        try{
            const data=await databases.createPost(enteredPostData.slug,blogDataToSave)
            navigate(`/post/${data.$id}`,{state:data})
            blogDataToSave.status==="active" ? dispatch(setAllPostData({data:null,fresh:false})) : dispatch(setSavedBlogsData({data:[],fresh:false}))
        }
        catch(e){
            return toast.error(e.message)
        }
        finally{
            setIsLoading(false)
        }
    }

    function handleChange(e){
        if(e.target.name==="title"){
            const slugValue=e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            setEnteredPostData({...enteredPostData,[e.target.name]:e.target.value,slug:slugValue})
        }
        else setEnteredPostData({...enteredPostData,[e.target.name]:e.target.value})
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                {addPostConstants.map(individualPost=><Input value={enteredPostData[individualPost.name]} eventHandler={handleChange} key={individualPost.id} {...individualPost}></Input>)}
                <Input type="file" isRequired={true} label="Select Featured Image" inputRef={imageRef} name="featuredImage"></Input>
                <RealTimeEditor quillRef={quillRef} initialValue={enteredPostData.content}></RealTimeEditor>
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