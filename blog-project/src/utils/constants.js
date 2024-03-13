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

  
export {loggedInNavItems,loggedOutNavItems,quillModules}