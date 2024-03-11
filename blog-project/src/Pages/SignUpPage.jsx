import { useState } from "react"
import Input from "../Components/Input"
import { loginInputData, signUpInputData } from "../utils/inputDataConstants"
import validation from "../utils/validation"
import authService from "../appwrite/auth"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { login } from "../store/authSlice"

function SignUpPage(){

    const [enteredSignUpData,setEnteredSignUpData]=useState({})
    const[errorMsg,setErrorMsg]=useState({})
    const dispatch=useDispatch()
    const prevPath=useLocation().state
    const navigate=useNavigate()
    const [isLoading,setIsLoading]=useState(false)

    function handleChange(e){
        setEnteredSignUpData({...enteredSignUpData,[e.target.name]:e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        const isErrorExist=validation(enteredSignUpData)
        console.log(enteredSignUpData)
        if(isErrorExist) return setErrorMsg(isErrorExist)

        setIsLoading(true)
        authService.createUser(enteredSignUpData).then(response=>{
            dispatch(login(response))
            const redirectPath=prevPath ? prevPath : "/"
            navigate(redirectPath,{replace:true})
        }).catch(error=>setErrorMsg({credentialError:error.message})).finally(()=>setIsLoading(false))
    }

    return(
        <form onSubmit={handleSubmit}>
            {signUpInputData.map(individualInputData=><Input key={individualInputData.id} error={errorMsg[individualInputData.errorName]} {...individualInputData} eventHandler={handleChange}></Input>)}
            <button className="bg-black text-white" disabled={isLoading}>Sign Up</button>
            <p className="text-red-500">{errorMsg.credentialError}</p>
        </form>
    )
}

export default SignUpPage