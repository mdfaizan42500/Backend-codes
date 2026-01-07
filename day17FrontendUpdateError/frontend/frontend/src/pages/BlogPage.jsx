import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function BlogPage() {
    const {id} = useParams()
    const [blogData , setBlogData] = useState(null)
    async function getBlogById() {
     try {
         const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`)
        setBlogData(res.data.blog)
     } catch (error) {
      console.log(error)
     }
    }

    useEffect(()=>{
      getBlogById()
    },[])
  return (
    <div className='max-w-[1000px]'>
      {
        blogData ? 
        <div className='flex flex-col items-center mx-auto h-[300px] w-[300px]'>
          <h1 className='font-bold text-3xl mt-10'>{blogData.title}</h1>
          <h2 className='my-5 text-2xl'>{blogData.creator.name}</h2>
          <img className='h-[300px] w-[200px]' src={blogData.image} alt="" />
          <Link to={"/edit/" + blogData.blogId}>
                      <button className='bg-green-500 mt-4 px-3  py-2 rounded-xl cursor-pointer'>Edit</button> 

          </Link>

        </div>
        
        : <div>Loading...</div>
      }
    </div>
  )
}

export default BlogPage
