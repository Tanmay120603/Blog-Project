import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { logout } from "../store/authSlice"
import { setSavedBlogsData } from "../store/postSlice"

function LogoutButton(){

    const dispatch=useDispatch()

    async function handleLogout(e){
        try{
            const response=await authService.logout()
            dispatch(logout())
            dispatch(setSavedBlogsData({data:[],fresh:false}))
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <button className="bg-white text-blue-500 rounded py-1 px-2 mr-7 hover:bg-slate-200" onClick={handleLogout}>Logout</button>
    )
}

export default LogoutButton