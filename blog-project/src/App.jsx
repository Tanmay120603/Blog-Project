import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import RootLayout from "./layout/RootLayout"
import Home from "./Pages/Home"
import RequireAuth from "./Components/RequireAuth"
import LoginPage from "./Pages/LoginPage"
import SignUpPage from "./Pages/SignUpPage"
import AddPostPage from "./Pages/AddPostPage"
import PostDetailsPage from "./Pages/PostDetailsPage"
import AllPostPage from "./Pages/AllPostPage"
import SavedBlogPage from "./Pages/SavedBlogPage"
import "./App.css"

function App(){
  const router=createBrowserRouter(createRoutesFromElements(<Route path="/" element={<RootLayout></RootLayout>}>
    <Route path="/" element={<Home></Home>}></Route>
    <Route path="/login" element={<LoginPage></LoginPage>}></Route>
    <Route path="/signup" element={<SignUpPage></SignUpPage>}></Route>
    <Route path="/saved/blogs" element={<RequireAuth><SavedBlogPage></SavedBlogPage></RequireAuth>}></Route>
    <Route path="/posts" element={<AllPostPage></AllPostPage>}></Route>
    <Route path="/add/post" element={<RequireAuth><AddPostPage></AddPostPage></RequireAuth>}></Route>
    <Route path="/post/:slug" element={<RequireAuth><PostDetailsPage></PostDetailsPage></RequireAuth>}></Route>
  </Route>))

  return(
    <div className="h-full">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App