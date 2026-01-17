import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthForm from './pages/AuthForm'
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import CreateBlog from './pages/CreateBlog'
import BlogPage from './pages/BlogPage'
import VerifyUser from "./components/VerifyUser";

function App() {
  return (
    <div className=' w-screen h-screen  '>
   <Routes>
      <Route path='/' element={<Navbar/>}>
        <Route path='/Signin' element={<AuthForm type={"Signin"} />}></Route>
        <Route path='/' element={<Homepage/>}></Route>
        <Route path='/Signup' element={<AuthForm type={"Signup"} />}></Route>
        <Route path='/Create-blog' element={<CreateBlog />}></Route>
        <Route path='/blog/:id' element={<BlogPage />}></Route>
        <Route path='/edit/:id' element={<CreateBlog />}></Route>
                            <Route
                        path="/verify-email/:verificationToken"
                        element={<VerifyUser/>}
                    ></Route>
      </Route>
   </Routes>
   </div>
  )
}

export default App

