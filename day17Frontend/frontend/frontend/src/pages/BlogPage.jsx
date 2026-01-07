import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addSelectedBlog, removeSelectedBlog } from '../utils/selectedBlogSlice'
import toast from 'react-hot-toast'

function BlogPage() {
    const {id} = useParams()

    const [isLike,setIsLike] = useState(false)

    const dispatch = useDispatch()
    // const user = JSON.parse(localStorage.getItem("user"))

    // useselector gives all slices of store here we have to select which slice we want
    const {token , email , name , id : userId} = useSelector((slice) => slice.user)  
    
    const [blogData , setBlogData] = useState(null)
    
    //function for getting the blog data from id
    async function getBlogById() {
     try {
         const {data : {blog}} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`)
        setBlogData(blog)
        if(blog.Likes.includes(userId)){
                        setIsLike(prev => !prev)
        }
        dispatch(addSelectedBlog(blog))
     } catch (error) {
      console.log(error)
     }
    }

    useEffect(()=>{
      getBlogById()

      return ()=>{
        dispatch(removeSelectedBlog())
      }

    },[])

    //function for handling like and dislike
   async function handleLike(){
      if(token){
              setIsLike(prev => !prev)
              let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/blogs/like/${blogData._id}` , {} , {
                headers :{
                  Authorization : `Bearer ${token}`
                }
              })
              toast.success(res.data.message)
      }else{
        return toast.error("please sign in to like")
      }
    }
    
  return (
    <div className=' max-w-[1000px]'>
      {
        blogData ? 
        <div className='flex flex-col items-center mx-auto h-[300px] w-[300px]'>
          <h1 className='font-bold text-3xl mt-10'>{blogData.title}</h1>
          <h2 className='my-5 text-2xl'>{blogData.creator.name}</h2>
          <img className='h-[300px] w-[200px]' src={blogData.image} alt="" />
          {token && blogData.creator.email== email && <Link to={"/edit/" + blogData.blogId}>
                      <button className='bg-green-500 mt-4 px-3  py-2 rounded-xl cursor-pointer'>Edit</button> 

          </Link>}
          {/* like and comment butons */}
          <div className='flex gap-3.5 mt-4'>
            
              <div 
                className='cursor-pointer flex gap-1'>
                {isLike ? <i onClick={handleLike} className="fi fi-sr-thumbs-up text-3xl"></i> : <i onClick={handleLike} className="fi fi-br-social-network text-3xl"></i> }
                <p className='text-3xl'>{blogData.Likes.length}</p>
              </div>
              <div className='cursor-pointer flex gap-1 '>
                <i className="fi fi-sr-comment-alt text-3xl"></i>
                <p className='text-3xl'>{blogData.Comments.length}</p>
              </div>
          </div>
        </div>
        
        : <div>Loading...</div>
      }
    </div>
  )
}

export default BlogPage
