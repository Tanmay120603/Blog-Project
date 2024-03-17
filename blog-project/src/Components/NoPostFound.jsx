import { Link } from "react-router-dom"

function NoPostFound(){
    return(
        <div className="h-[100vh] flex flex-col justify-center items-center">
        <img src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696458.jpg?w=540&t=st=1710426432~exp=1710427032~hmac=8b5efc0635d2727a79fff1a91bb41abb7e483d8eed5fc7484a3d6532f40af823" alt="no-post-image" />
        <p className="font-poppins">No post found! Try creating a <Link to="/add/post" className="text-blue-500 hover:underline font-semibold italic font-poppins hover:cursor-pointer">new post</Link></p>
        </div>
    )
}

export default NoPostFound