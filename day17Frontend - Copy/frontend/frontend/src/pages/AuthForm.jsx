import React, { useState } from "react";
import toast from 'react-hot-toast'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { login } from "../utils/userSlice";
import Input from "../components/Input";

function AuthForm({ type }) {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  //dispatch to send data to store
const dispatch = useDispatch()

  async function handleAuthForm(e) {
    e.preventDefault();
    try {
    
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/${type}` , 
        userData
    )
          if (type == "Signup") {
        toast.success(res.data.message);
        navigate("/Signin");
      } else {
        dispatch(login(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setUserData({
        name: "",
        email: "",
        password: "",
      });
    }
  }
 return (
    <div className="w-full">
      <div className=" bg-gray-100 p-4 rounded-xl mx-auto max-w-[400px] flex flex-col items-center gap-5 mt-52">
        <h1 className="text-3xl">
          {type === "Signin" ? "Signin" : "Signup"}
        </h1>
        <form
          className="w-[100%] flex flex-col items-center gap-5"
          onSubmit={handleAuthForm}
        >
          {type == "Signup" && (
            <Input
              type={"text"}
              placeholder={"Enter you name"}
              setUserData={setUserData}
              field={"name"}
              value={userData.name}
              icon={"fi-br-user"}
            />
          )}
              <Input
            type={"email"}
            placeholder={"Enter your email"}
            setUserData={setUserData}
            field={"email"}
            value={userData.email}
            icon={"fi-rr-at"}
          /><Input
            type={"password"}
            placeholder={"Enter your password"}
            setUserData={setUserData}
            field={"password"}
            value={userData.password}
            icon={"fi-rr-lock"}
          />
                  <button className="w-[100px] h-[50px] text-white text-xl p-2 rounded-md focus:outline-none bg-blue-500">
            {type == "Signin" ? "Login" : "Register"}
          </button>
        </form>
     {type == "Signin" ? (
          <p>
            Don't have an account <Link to={"/Signup"}>Sign up</Link>
          </p>
        ) : (
          <p>
            Already have an account <Link to={"/Signin"}>Sign in</Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
