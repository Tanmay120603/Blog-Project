import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { loggedInNavItems,loggedOutNavItems } from "../utils/constants"
import LogoutButton from "./LogoutButton"

function Header(){
    const authData=useSelector(store=>store.authSlice)
    const navItemsToDisplay= authData.loggedIn ? loggedInNavItems : loggedOutNavItems 
    return(
        <div className="w-full flex justify-between">
            <nav>
                <ul>
                    {navItemsToDisplay.map((navItem,index)=><Link to={navItem.path} key={index}><li>{navItem.itemName}</li></Link>)}
                </ul>
                {authData.loggedIn && <LogoutButton></LogoutButton>}
            </nav>
        </div>
    )
}

export default Header