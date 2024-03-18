import { useEffect, useState } from "react"
import Footer from "../Components/Footer"
import Header from "../Components/Header"
import {Outlet} from "react-router-dom"
import authService from "../appwrite/auth"
import { useDispatch } from "react-redux"
import { login } from "../store/authSlice"
import Spinner from "../Components/Spinner"

function RootLayout(){

    const dispatch=useDispatch()
    const [isLoading,setIsLoading]=useState(true)

    useEffect(()=>{
        authService.getCurrentStateOfUser().then(response=>dispatch(login(response))).catch(error=>console.log(error.message)).finally(()=>setIsLoading(false))
    },[])

    if(isLoading){
        return <Spinner></Spinner>
    }

    return(
        <div>
            <Header></Header>
                <Outlet/>
            <Footer></Footer>
        </div>
    )
}

export default RootLayout