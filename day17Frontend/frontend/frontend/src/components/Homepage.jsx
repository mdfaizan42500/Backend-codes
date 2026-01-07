import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Homepage() {
  const [blogs , setBlogs] = useState([])

  async function fetchData() {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs`)
    
    setBlogs(res.data.blogs)
    console.log(res.data.blogs)
  }

  useEffect(()=>{
    fetchData()
  },[])
  return (
    <div className="w-[60%] flex flex-col mx-auto">
      {blogs.map((blog)=>(
        <Link key={blog._id} to={"blog/" + blog.blogId}>
              <div  className="my-5 flex w-full justify-between">

              <div className="w-[60%] flex flex-col gap-2">
                <div>
                  {/* <img src="" alt="" /> */}
                  <p>{blog.creator.name}</p> 
                </div>
                
                <h2 className="text-xl font-bold">{blog.title}</h2>
                <h4 className="line-clamp-2">{blog.description}
                </h4>

                <div className="flex gap-4">
                  <p>{blog.createdAt}</p>

                   {/* like and comment butons */}
          <div className='flex gap-3.5'>
            
              <div 
                className='cursor-pointer flex gap-1'>
                <i  className="fi fi-sr-thumbs-up text-lg"></i> 
                <p className='text-lg'>{blog.Likes.length}</p>
              </div>
              <div className='cursor-pointer flex gap-1 '>
                <i className="fi fi-sr-comment-alt text-lg"></i>
                <p className='text-lg'>{blog.Comments.length}</p>
              </div>
          </div>
                </div>
              </div>


              <div className="w-[25%]">
                <img src={blog.image} alt="" />
              </div>
            </div>
        </Link>
        
      ))}
    </div>
  );
}

export default Homepage;
