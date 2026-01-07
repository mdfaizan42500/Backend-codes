import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Signup from '../Pages/signup'


function CreateBlog() {
  // check if the user is registered means data is present in localstorage then take out token from then else return to the signup page
  let user = JSON.parse(localStorage.getItem("user"))
  // console.log(user)

const [blogData, setBlogData] = useState({
    title: "",
    description: ""
  });

  // function to send data on server and recieve response from it
  async function sendBlogData() {
    let data = await fetch("http://localhost:3000/api/v1/blogs", {
      method: "POST",
      body: JSON.stringify(blogData),
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${user.token}`
      },
    });
    let res = await data.json();
    alert(res.message);
    // alert(JSON.stringify(formData))
    console.log(res)
  }

  if(!user){
    return <Navigate to={"/Signup"}/>
    
  }
  
  return (
   <div>
      <h1>Create blog</h1>

      <input
        onChange={(e) =>
          setBlogData((prev) => ({ ...prev, title: e.target.value }))
        }
        type="title"
        name=""
        id=""
        placeholder="title"
      />
      <br />
      <br />
      <input
        onChange={(e) =>
          setBlogData((prev) => ({ ...prev, description: e.target.value }))
        }
        type="description"
        name=""
        id=""
        placeholder="description"
      />
      <br />
      <br />
      <input type="submit" onClick={sendBlogData} />

     
    </div>
  )
}

export default CreateBlog
