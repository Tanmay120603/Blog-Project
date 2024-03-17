import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { loggedInNavItems,loggedOutNavItems } from "../utils/constants"
import LogoutButton from "./LogoutButton"

function Header(){
    const authData=useSelector(store=>store.authSlice)
    const navItemsToDisplay= authData.loggedIn ? loggedInNavItems : loggedOutNavItems 
    return(
        <div className="w-full fixed top-0 max-w-full z-40 flex items-center bg-blue-500 h-[45px] text-white">
            <nav className="flex justify-between w-full">
                <ul className="flex w-[40%] justify-evenly items-center">
                    {navItemsToDisplay.map((navItem,index)=><NavLink to={navItem.path} key={index}><li>{navItem.itemName}</li></NavLink>)}
                </ul>
                {authData.loggedIn && <LogoutButton></LogoutButton>}
            </nav>
        </div>
    )
}

export default Header