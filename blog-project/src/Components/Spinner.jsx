function Spinner(){
    return(
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <div className="animate-spin" style={{border:"16px solid #f3f3f3",borderTop:"16px solid #3498db",borderRadius: "50%",width: "120px",height: "120px"}}></div>
        </div>
    )
}

export default Spinner