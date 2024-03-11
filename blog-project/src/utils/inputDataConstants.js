const loginInputData=[{id:1,placeHolder:"Enter your email address",errorName:"emailError",label:"Email",type:"email",name:"email",isRequired:false},{id:2,placeHolder:"Enter your password",name:"password",errorName:"passwordError",label:"Password",type:"password",isRequired:false}]

const signUpInputData=[{id:1,placeHolder:"Enter user name here",errorName:"userNameError",label:"User Name",name:"userName",type:"text",isRequired:true,errorName:"userNameError"},{id:2,placeHolder:"Enter your email address",errorName:"emailError",label:"Email",type:"email",name:"email",errorName:"emailError",isRequired:false},{id:3,placeHolder:"Enter your password",errorName:"passwordError",label:"Password",errorName:"passwordError",name:"password",type:"password",isRequired:false}]

const addPostConstants=[{id:1,placeHolder:"Enter the title",label:"Title",name:"title",type:"text",isRequired:true},{id:2,placeHolder:"Based on Title slug would be generated",label:"Slug",type:"text",name:"slug",disabled:true}]

export {loginInputData,signUpInputData,addPostConstants}