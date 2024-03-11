import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { logout } from "../store/authSlice"

function LogoutButton(){

    const dispatch=useDispatch()

    async function handleLogout(e){
        try{
            const response=await authService.logout()
            dispatch(logout())
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <button onClick={handleLogout}>Logout</button>
    )
}

export default LogoutButton