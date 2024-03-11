import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

function RequireAuth({children}){
    const location=useLocation()
    const {loggedIn}=useSelector(store=>store.authSlice)
    if(!loggedIn) return <Navigate to={"/login"} state={location.pathname}></Navigate>
    return(
        <div>{children}</div>
    )
}

export default RequireAuth