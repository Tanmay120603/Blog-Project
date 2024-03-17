function getQuery(enhancementData,currPostData){

    const optimizeTitleQuery=`Act as a social media content writer, analyze this title ${currPostData.title}, and remove/add parts if necessary to make the blog post more engaging and informative and also the title should be catchy and 100 characters max`

    const generateTitleQuery=`Act as a social media content writer,Write the title for my blog. Here’s a description about the blog title based on which you should generate the title ${enhancementData.titleExtraDesc} and also the title should be catchy and 100 characters max`

    const generateContentQuery=`Create a blog post about “${enhancementData.contentRelatedTopic}”. Write it in a “${enhancementData.contentTone}” tone. Use transition words. Use active voice. Write over 1800 characters. Use very creative titles for the blog post. Add a title for each section. Ensure there are a minimum of 6 sections. Each section should have a minimum of two paragraphs. Include the following keywords: ${enhancementData.contentKeywords}`

    const optimizeContentQuery=`${currPostData.content} Find and replace any clichés found in this content to enhance its uniqueness and readability and generate the output like google text don't generate the response in HTML format `

    if(enhancementData.enhancementField==="title" && enhancementData.enhancementType==="optimize"){
        return optimizeTitleQuery
    }
    else if(enhancementData.enhancementField==="title" && enhancementData.enhancementType==="generate"){
        return generateTitleQuery
    }
    else if(enhancementData.enhancementField==="content" && enhancementData.enhancementType==="optimize"){
        return optimizeContentQuery
    }
    else if(enhancementData.enhancementField==="content" && enhancementData.enhancementType==="generate"){
        return generateContentQuery
    }
}

export default getQuery