import { useState } from "react"
import Input from "../Components/Input"
import { loginInputData } from "../utils/inputDataConstants"
import validation from "../utils/validation"
import authService from "../appwrite/auth"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../store/authSlice"
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom"
import Button from "../Components/Button"
import { buttonStylingTailwindClasses } from "../utils/constants"

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
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                Blogsite    
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-poppins text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Login to account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>                    
                        {loginInputData.map(individualInputData=><Input key={individualInputData.id} error={errorMsg[individualInputData.errorName]} {...individualInputData} eventHandler={handleChange}></Input>)}
                        <Button text="Login" disabled={isLoading} stylingClasses={buttonStylingTailwindClasses+" w-[100%]"} loading={isLoading} ></Button>
                        <p className="text-red-500">{errorMsg.credentialError}</p>
                        <p className="text-sm font-light font-poppins text-gray-500 dark:text-gray-400">
                        Don't have an account? <Link className="font-medium text-blue-600 hover:underline dark:text-primary-500" to="/signup">Signup here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>   
    )
}

export default LoginPage