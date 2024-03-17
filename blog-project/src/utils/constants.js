const loggedInNavItems=[{itemName:"Home",path:"/"},{itemName:"All Posts",path:"/posts"},{itemName:"Saved Blogs",path:"/saved/blogs"},{itemName:"Add Post",path:"/add/post"}]
const loggedOutNavItems=[{itemName:"Home",path:"/"},{itemName:"All Posts",path:"/posts"},{itemName:"Add Post",path:"/add/post"},{itemName:"Login",path:"/login"},{itemName:"Sign Up",path:"/signup"}]
const quillModules={
    toolbar: {
      container: [
        [{ header: [2, 3, 4, false] }],
        ["bold", "italic", "underline", "blockquote"],
        [{ color: [] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
    },
    clipboard: {
      matchVisual: true,
    },
  }

  const labelStylingTailwindClasses="flex w-[400px] h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-blue-500 before:border-blue-gray-200 peer-focus:before:!border-blue-500 after:border-blue-gray-200 peer-focus:after:!border-blue-500"

  const inputStylingTailwindClasses="peer w-[400px] h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-500"

  const buttonStylingTailwindClasses="w-[400px] flex justify-center text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"

  const speechTones = [
    { id:0, toneValue:"default", toneText: "Select speech tone" },
    { id: 1, toneValue: "assertive", toneText: "Assertive" },
    { id: 2, toneValue: "apologetic", toneText: "Apologetic" },
    { id: 3, toneValue: "confident", toneText: "Confident" },
    { id: 4, toneValue: "formal", toneText: "Formal" },
    { id: 5, toneValue: "informal", toneText: "Informal" },
    { id: 6, toneValue: "optimistic", toneText: "Optimistic" },
    { id: 7, toneValue: "pessimistic", toneText: "Pessimistic" },
    { id: 8, toneValue: "authoritative", toneText: "Authoritative" },
    { id: 9, toneValue: "emotional", toneText: "Emotional" },
    { id: 10, toneValue: "neutral", toneText: "Neutral" }
];
  
export {loggedInNavItems,loggedOutNavItems,quillModules,inputStylingTailwindClasses,labelStylingTailwindClasses,buttonStylingTailwindClasses,speechTones}