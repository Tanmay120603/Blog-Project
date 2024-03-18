import { useNavigate } from "react-router-dom"
import { buttonStylingTailwindClasses } from "../utils/constants"

function Home(){
    const navigate=useNavigate()

    return(
       <div className="bg-homeBackground h-[100vh] bg-cover bg-no-repeat bg-center flex flex-col gap-4 justify-center items-center">
            <h1 className="font-poppins text-3xl text-white">Welcome to the site</h1>
            <div className="flex justify-center w-full gap-5">
                <button onClick={()=>navigate("/posts")} className={`${buttonStylingTailwindClasses} w-1/3  md:w-1/5`}>View Post</button>
                <button onClick={()=>navigate("/add/post")} className={`${buttonStylingTailwindClasses} w-1/3 md:w-1/5`}>Add Post</button>
            </div>
       </div>
    )

}

export default Home