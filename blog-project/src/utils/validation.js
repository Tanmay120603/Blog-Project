function validation(inputDataObj){
    const errorMsgObj={}
    if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputDataObj.email))){
        errorMsgObj.emailError="Please enter a valid email"
    }
    if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(inputDataObj.password))){
        errorMsgObj.passwordError="Please enter a valid password"
    }
    if(inputDataObj.userName!==undefined && !(/^[0-9A-Za-z]{6,16}$/.test(inputDataObj.userName))){
        errorMsgObj.userNameError="Please enter a valid username"
    }
    if(Object.keys(errorMsgObj).length!==0){
        return errorMsgObj
    }
    return null
}

export default validation