function getFilteredData(postArr,filterBy){
    if(filterBy.status==="none")
    return postArr
    else 
    return postArr.filter(individualPost=>individualPost.status===filterBy.status)
}

export default getFilteredData