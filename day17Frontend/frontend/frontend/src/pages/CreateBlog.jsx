import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// import EditorJS from "@editorjs/editorjs";
// import Header from "@editorjs/header";
// import List from "@editorjs/list";
// import NestedList from "@editorjs/nested-list";
// import CodeTool from "@editorjs/code";
// import Marker from "@editorjs/marker";
// import Underline from "@editorjs/underline";
// import Embed from "@editorjs/embed";
// import RawTool from "@editorjs/raw";
// import ImageTool from "@editorjs/image";
// import TextVariantTune from "@editorjs/text-variant-tune";

function CreateBlog() {
  const {id} = useParams()
  const editorjsRef = useRef(null);

  const formData = new FormData();
  const {token} = useSelector((slice)=> slice.user)
  const {title,description,image} = useSelector((slice)=> slice.selectedBlog)
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    image: null,
    
  });

  async function handlePostBlog() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/blogs`,
        blogData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    console.log(blogData);
  }

  async function handleUpdateBlog() {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/edit/` + id,
        blogData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
    
  }

   async function getBlogById() {
    //  try {
    //      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`)
    //     setBlogData({
    //       title : res.data.blog.title,
    //       description : res.data.blog.description,
    //       image : res.data.blog.image
    //     })
    //     console.log(res)
    //  } catch (error) {
    //   toast.error(error.response.data.message)
    //  }
     setBlogData({
         title : title,
          description : description,
          image : image
       })
    }

    useEffect(()=>{
      if(id){
              getBlogById()
      }
    },[id])

  return token == null ? (
    <Navigate to={"/Signup"} />
  ) :  (
    <div className="w-[500px] mx-auto">
      <label htmlFor="">Title</label>
      <input
        type="text"
        placeholder="Enter Title"
        onChange={(e) =>
          setBlogData((blogData) => ({ ...blogData, title: e.target.value }))
        }
        value={blogData.title}
      />
      <br />
      <label htmlFor="">Description</label>
      <input
        type="text"
        placeholder="Enter description"
        onChange={(e) =>
          setBlogData((blogData) => ({
            ...blogData,
            description: e.target.value,
          }))
        }
        value={blogData.description}
      />
      <br />

      <div>
        <label htmlFor="image" className="bg-blue-400">
          {blogData.image ?  ( <img src={typeof(blogData.image) == "string" ? blogData.image : URL.createObjectURL(blogData.image)}  className="w-[200%] h-[400px] object-contain"/>) : (<div className="bg-blue-400 aspect-video flex justify-center items-center text-xl font-bold">Select image</div>)}
          
        </label>
      <input
        className="hidden"
        id="image"
        type="file"
        accept=".png , .JPG , .jpeg"
        onChange={(e) =>
          setBlogData((blogData) => ({ ...blogData, image: e.target.files[0] }))
        }
      />
      </div>
      
      <br />
      <button className="cursor-pointer bg-amber-500" onClick={id ? handleUpdateBlog : handlePostBlog}>{id ? "Update blog" : "Post blog"}</button>
    </div>
  ) 
}

export default CreateBlog;
