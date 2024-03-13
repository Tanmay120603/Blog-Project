import { useState } from "react"
import Input from "../Components/Input"
import { loginInputData } from "../utils/inputDataConstants"
import validation from "../utils/validation"
import authService from "../appwrite/auth"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../store/authSlice"
import { useNavigate, useLocation, Navigate } from "react-router-dom"
import Button from "../Components/Button"

function LoginPage(){

    const authData=useSelector(store=>store.authSlice)
    const [enteredLoginData,setEnteredLoginData]=useState({})
    const [errorMsg,setErrorMsg]=useState({})
    const [isLoading,setIsLoading]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const prevPath=useLocation().state

    function handleChange(e){
        setEnteredLoginData({...enteredLoginData,[e.target.name]:e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        const isErrorExist=validation(enteredLoginData)
        if(isErrorExist)return setErrorMsg(isErrorExist)

        setIsLoading(true)

        authService.loginUser(enteredLoginData).then(response=>{
        dispatch(login(response))
        const redirectPath=prevPath ? prevPath : "/" 
        navigate(redirectPath,{replace:true})
        }).catch(error=>setErrorMsg({...errorMsg,credentialError:error.message})).finally(()=>setIsLoading(false))
    }

    if(authData.loggedIn){
        return(
            <Navigate to={prevPath ? prevPath : "/"}></Navigate>
        )
    }

    return(
        <form onSubmit={handleSubmit}>
            {loginInputData.map(individualInputData=><Input key={individualInputData.id} error={errorMsg[individualInputData.errorName]} {...individualInputData} eventHandler={handleChange}></Input>)}
           <Button text="Login" disabled={isLoading} loading={isLoading} ></Button>
            <p className="text-red-500">{errorMsg.credentialError}</p>
        </form>    
    )
}

export default LoginPage