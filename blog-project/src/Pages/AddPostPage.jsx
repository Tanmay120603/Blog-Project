import { useDispatch, useSelector } from "react-redux"
import Input from "../Components/Input"
import RealTimeEditor from "../Components/RealTimeEditor"
import storageService from "../appwrite/storageService"
import {addPostConstants} from "../utils/inputDataConstants" 
import { useEffect, useState } from "react"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import databases from "../appwrite/databaseService"
import Button from "../Components/Button"
import { useNavigate } from "react-router-dom"
import Compressor from 'compressorjs'
import { setAddPostIntialState, setAllPostData, setMyPostsData} from "../store/postSlice"
import AssistanceModal from "../Components/AssistanceModal"

function AddPostPage(){

    const dispatch=useDispatch()
    const [isLoading,setIsLoading]=useState(false)
    const {authSlice:authValue,postSlice}=useSelector(store=>store)
    const [enteredPostData,setEnteredPostData]=useState(postSlice.addPostIntialState)
    const [showModal,setShowModal]=useState(false)
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
            dispatch(setMyPostsData({data:[],fresh:false}))
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
            const slugValue=e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '').slice(0,30)
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
            {showModal && <AssistanceModal currentPostData={enteredPostData} setShowModal={setShowModal}></AssistanceModal>}
            <form onSubmit={handleSubmit} className="h-[90vh] mt-[10vh] gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 xl:gap-10">
                <div className="md:h-full md:max-h-full h-1/2 lg:col-span-2 flex flex-col gap-4 mx-2 xl:ml-5">
                {!postSlice.addPostIntialState.slug &&
                addPostConstants.map(individualPost=><Input value={enteredPostData[individualPost.name]} labelStyling="-order-1 font-semibold w-[100%]" eventHandler={handleChange} key={individualPost.id} inputStyling="p-2 border border-blue-500 rounded focus:outline-blue-800 font-poppins w-[100%]" {...individualPost}></Input>)
                }
                <RealTimeEditor editorStyling="h-fit w-[100%]" eventHandler={handleChange} value={enteredPostData.content}></RealTimeEditor>
                </div>
                <div className="flex flex-col gap-4 items-center lg:items-start">
                <Input type="file" labelStyling="-order-1 font-semibold self-center md:self-start" inputStyling="p-2 self-center md:self-start border border-blue-500 rounded focus:outline-blue-800 font-poppins" eventHandler={handleCompression} isRequired={true} label="Choose Image" name="featuredImage"></Input>
                <select name="status" className="p-2 w-[75%] border border-blue-500 rounded focus:outline-blue-800 font-poppins" defaultValue={enteredPostData.status} required={true} onChange={handleChange}>
                    <option value="" hidden>Please choose an option</option>
                    <option value="active">Publish to All Posts</option>
                    <option value="inactive">Save to saved blogs</option>
                </select>
                <Button disabled={isLoading} stylingClasses="w-[75%] flex justify-center font-poppins border border-blue-500 rounded py-2 hover:bg-blue-800 hover:text-white" loading={isLoading} text="Submit"></Button>
                <span className="py-1 px-2 rounded hover:bg-blue-800 hover:text-white border border-blue-500 font-poppins" onClick={()=>setShowModal(true)}>Need Ai Assistance</span>
                </div>
            </form>
            <ToastContainer position="top-left" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}pauseOnFocusLoss draggable pauseOnHover theme="light"></ToastContainer>
        </div>
    )   
}

export default AddPostPage