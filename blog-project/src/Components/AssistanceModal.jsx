import { useState } from "react"
import Button from "./Button"
import { buttonStylingTailwindClasses, speechTones } from "../utils/constants"
import getGptResponse from "../utils/getGptResponse"
import getQuery from "../utils/getQuery"
import { toast,ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from "react-redux"

function AssistanceModal({currentPostData,setShowModal}){

    const [enhancementData,setEnhancementData]=useState({enhancementField:" ? ",enhancementType:"optimize",titleExtraDesc:"",contentTone:"",contentKeywords:"",contentRelatedTopic:""})
    const [isLoading,setIsLoading]=useState(false)
    const [generatedResponse,setGeneratedResponse]=useState()
    const addPostIntialState=useSelector(state=>state.postSlice.addPostIntialState)

    function handleChange(e){
        setEnhancementData({...enhancementData,[e.target.name]:e.target.value})
    }

    function handleClick(){
        setIsLoading(true)
        const query=getQuery(enhancementData,currentPostData)
        getGptResponse(query).then(res=>{
            toast.info("Message from AI: Response Ready! Click copy and view the response")
            setGeneratedResponse(res)
        }).catch(()=>toast.error("Something went wrong please try again!")).finally(()=>setIsLoading(false))
    }

    return(   
        <>   
        <div className=" w-full max-w-full h-[100vh] flex justify-center items-center absolute top-0">
            <div className="xl:w-[40%] xl:h-[60%] md:w-[80%] md:h-[50%] lg:w-[50%] lg:h-[80%] w-[95%] h-[80%] flex flex-col items-center gap-5 bg-white relative z-20 border-2 border-blue-500 rounded">
                <button className="self-end mr-6 mt-2 text-lg border border-red-500 rounded px-4 py-1 hover:bg-red-500 hover:text-white" onClick={()=>setShowModal(false)}>X</button>
                <div className="flex flex-col gap-2">
                <label htmlFor="enhancementField">Which field you want to improve using AI</label>
                <select name="enhancementField" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} defaultValue="default" id="enhancementField">
                    <option value="default" hidden>Select field</option>
                    {!addPostIntialState.slug && <option value="title">Title</option>}
                    <option value="content">Content</option>
                </select>
                </div>
            <div className="w-full max-w-full flex justify-around">                
            <div className="flex items-center w-[40%] ps-4 border border-gray-200 rounded dark:border-gray-700">
                <input id="bordered-radio-1" required onChange={handleChange} type="radio" value="optimize" name="enhancementType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="bordered-radio-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Optimize {enhancementData.enhancementField}</label>
            </div>
            <div className="flex items-center ps-4 w-[40%] border border-gray-200 rounded dark:border-gray-700">
                <input id="bordered-radio-2" required onChange={handleChange} type="radio" value="generate" name="enhancementType" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                <label htmlFor="bordered-radio-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Generate new {enhancementData.enhancementField}</label>
            </div>
        </div>
        {enhancementData.enhancementType=="generate" && enhancementData.enhancementField=="title" && 
        <textarea id="message" name="titleExtraDesc" rows="4" className="block p-2.5 w-[80%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} placeholder="Write a short description to generate title here..."></textarea>
        }

        {enhancementData.enhancementType=="generate" && enhancementData.enhancementField=="content" &&
        <>
        <div className="flex justify-center gap-5 w-full">
        <select id="tone" name="contentTone" onChange={handleChange}> 
        {speechTones.map(speechTone=><option hidden={speechTone.toneValue=="default"} key={speechTone.id} value={speechTone.toneValue}>{speechTone.toneText}</option>)}
        </select>
        <input onChange={handleChange} type="text" name="contentKeywords" placeholder="Enter Keywords" className="w-[50%]"/>
        </div>
        <textarea id="message" name="contentRelatedTopic" rows="4" className="block p-2.5 w-[80%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleChange} placeholder="Enter the topic related to which you want to generate content"></textarea>
        </>
        }

    <Button text="Generate" eventHandler={handleClick} loading={isLoading} stylingClasses={buttonStylingTailwindClasses+" w-3/4"}></Button>
    {generatedResponse && <div className="w-full max-w-full flex justify-center items-center gap-5 font-poppins font-semibold text-blue-800">
        Your response has been generated
        <button onClick={()=>navigator.clipboard.writeText(generatedResponse)} className="border border-blue-500 rounded py-2 px-4 hover:bg-blue-800 hover:text-white">Copy</button>
    </div>}
    <ToastContainer position="bottom-left" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}pauseOnFocusLoss draggable pauseOnHover theme="dark"></ToastContainer>
    </div>
        </div>
        <div className="h-[100vh] w-full bg-black opacity-50 fixed top-0 z-10"></div>
        </>
    )
}

export default AssistanceModal