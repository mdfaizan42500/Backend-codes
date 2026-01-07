import React, { useState } from "react";
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

function AuthForm({ type }) {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  async function handleAuth(e) {
    e.preventDefault();
    try {

        // using axios instead of this
    //   const data = await fetch(`http://localhost:3000/api/v1/${type}`, {
    //     method: "POST",
    //     body: JSON.stringify(userData),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   const res = await data.json();
    
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/${type}` , 
        userData
    )
    localStorage.setItem("user", JSON.stringify(res.data.user))
    localStorage.setItem("token", JSON.stringify(res.data.token))
      toast.success(res.data.message)
      if(res.data.success){
        navigate("/")
      }
      console.log(res)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  return (
    <div className="flex flex-col gap-5 w-[30%] mt-44 ml-[500px]">
      <h1 className="text-2xl font-bold">
        {type == "Signin" ? "Sign in" : "Sign up"}
      </h1>
      <form className="flex flex-col gap-5" action="" onSubmit={handleAuth}>
        {type == "Signup" && (
          <input
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="rounded-xl bg-gray-800 text-xl w-full text-white p-1"
            type="name"
            placeholder="Enter your name"
          />
        )}

        <input
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="rounded-xl bg-gray-800 text-xl w-full text-white p-1"
          type="email"
          placeholder="Enter your email"
        />
        <input
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, password: e.target.value }))
          }
          className="rounded-xl bg-gray-800 text-xl w-full text-white p-1"
          type="password"
          placeholder="Enter your password"
        />
        <button className="rounded-xl bg-gray-800 text-xl text-white p-1">
          {type == "Signup" ? "Register" : "Sign in"}
        </button>
      </form>
      {type == "Signin" ? <p>Don't have an account! <Link to={"/Signup"}>Sign up</Link></p>  : <p>Already have an account <Link to={"/Signin"}>Sign in</Link></p>}
    </div>
  );
}

export default AuthForm;
