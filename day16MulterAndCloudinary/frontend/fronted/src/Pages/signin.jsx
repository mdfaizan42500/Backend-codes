import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

function Signin() {

  const navigate = useNavigate()

    const [formData, setformData] = useState({
     email: "",
      password: "",
    });


    // function to send data on server and recieve response from it
  async function sendData() {
    let data = await fetch("http://localhost:3000/api/v1/login", {
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
      
       navigate("/create-blog")
      
    }

  }
  return (
    <div>
      <h1>Sign in</h1>

      
      <input
        onChange={(e) =>
          setformData((prev) => ({ ...prev, email: e.target.value }))
        }
        type="email"
        name=""
        id=""
        placeholder="youremail@gmail.com"
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

export default Signin
