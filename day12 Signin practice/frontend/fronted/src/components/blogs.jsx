import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Signup from '../Pages/signup';


function Blogs() {
  // this will work navigation inside event handler
  const navigate = useNavigate()

  //taking out user from localstorage to logout on click of button
  let user = JSON.parse(localStorage.getItem("user"))

     //to store blogs
  const [blogs, setBlogs] = useState([]);

  // function to get blogs from api
  async function fetchBlog() {
    let data = await fetch("http://localhost:3000/api/v1/blogs");
    let res = await data.json();
    setBlogs(res.blogs);
  }

  // useEffect for calling the api when refresh
  useEffect(() => {
    fetchBlog();
  }, []);

  
    //function to clear localstorage and navigate on page
    function logout(){
      localStorage.clear()
      navigate("/signup")
    }
    
  


 

  return (
    <div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>

       <h1>here are blog title</h1>
      {blogs.map((blog) => (
        <ul key={blog._id}>
          <li>{blog.title}</li>
          <p>{blog.description}</p>
        </ul>
      ))}
    </div>
  )
}

export default Blogs
