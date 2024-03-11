function setInitialState(data){
    return data.reduce((accumaltor,individualData)=>{
        return {...accumaltor,[individualData.name]:""}
    },{})
}

export default setInitialState