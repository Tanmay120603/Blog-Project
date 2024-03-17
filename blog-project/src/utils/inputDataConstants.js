import { inputStylingTailwindClasses, labelStylingTailwindClasses } from "./constants"

const loginInputData=[{id:1,errorName:"emailError",label:"Email",type:"email",name:"email",isRequired:false,inputStyling:inputStylingTailwindClasses,labelStyling:labelStylingTailwindClasses},{id:2,name:"password",errorName:"passwordError",label:"Password",type:"password",isRequired:false,inputStyling:inputStylingTailwindClasses,labelStyling:labelStylingTailwindClasses}]

const signUpInputData=[{id:1,errorName:"userNameError",label:"User Name",name:"userName",type:"text",isRequired:true,labelStyling:labelStylingTailwindClasses,inputStyling:inputStylingTailwindClasses},{id:2,errorName:"emailError",label:"Email",labelStyling:labelStylingTailwindClasses,type:"email",name:"email",isRequired:false,inputStyling:inputStylingTailwindClasses},{id:3,errorName:"passwordError",label:"Password",name:"password",inputStyling:inputStylingTailwindClasses,labelStyling:labelStylingTailwindClasses,type:"password",isRequired:false}]

const addPostConstants=[{id:1,placeHolder:"Enter the title",label:"Title",name:"title",type:"text",isRequired:true},{id:2,placeHolder:"Based on Title slug would be generated",label:"Slug",type:"text",name:"slug",disabled:true}]

export {loginInputData,signUpInputData,addPostConstants}