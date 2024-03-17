import { useState } from "react"
import Input from "../Components/Input"
import { signUpInputData } from "../utils/inputDataConstants"
import validation from "../utils/validation"
import authService from "../appwrite/auth"
import { useDispatch } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { login } from "../store/authSlice"
import Button from "../Components/Button"
import { buttonStylingTailwindClasses } from "../utils/constants"

function SignUpPage(){

    const [enteredSignUpData,setEnteredSignUpData]=useState({})
    const [errorMsg,setErrorMsg]=useState({})
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
        if(isErrorExist) return setErrorMsg(isErrorExist)

        setIsLoading(true)
        authService.createUser(enteredSignUpData).then(response=>{
            dispatch(login(response))
            const redirectPath=prevPath ? prevPath : "/"
            navigate(redirectPath,{replace:true})
        }).catch(error=>setErrorMsg({credentialError:error.message})).finally(()=>setIsLoading(false))
    }

    return(
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
                Blogsite    
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-poppins text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        {signUpInputData.map(individualInputData=><Input key={individualInputData.id} error={errorMsg[individualInputData.errorName]} {...individualInputData} eventHandler={handleChange}></Input>)}
                        <Button text="Sign Up" stylingClasses={buttonStylingTailwindClasses} disabled={isLoading} loading={isLoading} ></Button>
                        <p className="text-red-500">{errorMsg.credentialError}</p>
                        <p className="text-sm font-light font-poppins text-gray-500 dark:text-gray-400">
                            Already have an account? <Link className="font-medium text-blue-600 hover:underline dark:text-primary-500" to="/login">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
      </section>
    )
}

export default SignUpPage