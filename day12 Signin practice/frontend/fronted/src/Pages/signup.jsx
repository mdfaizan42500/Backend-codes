import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function Signup() {

  // taking the detail of user if present in localstorage than not showing him the page
  let user = JSON.parse(localStorage.getItem("user"))
  if(user){
    return <h1>You are already registered</h1>
  }   

     const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

 
  // function to send data on server and recieve response from it
  async function sendData() {
    let data = await fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res = await data.json();
    alert(res.message);
    //if all the given data is true then check is it success then set the user detail which contain token in it to the local storage  
    if(res.success){
      localStorage.setItem("user" , JSON.stringify(res.user))
    }
    // alert(JSON.stringify(formData))
    console.log(res)
  }
  return (
    <div>
      <h1>Sign up</h1>

      <input
        onChange={(e) =>
          setformData((prev) => ({ ...prev, name: e.target.value }))
        }
        type="name"
        name=""
        id=""
        placeholder="John"
      />
      <br />
      <br />
      <input
        onChange={(e) =>
          setformData((prev) => ({ ...prev, email: e.target.value }))
        }
        type="email"
        name=""
        id=""
        placeholder="email@gmail.com"
      />
      <br />
      <br />
      <input
        onChange={(e) =>
          setformData((prev) => ({ ...prev, password: e.target.value }))
        }
        type="password"
        name=""
        id=""
        placeholder="password"
      />
      <br />
      <br />
      <input type="submit" onClick={sendData} />

     
    </div>
  )
}

export default Signup
