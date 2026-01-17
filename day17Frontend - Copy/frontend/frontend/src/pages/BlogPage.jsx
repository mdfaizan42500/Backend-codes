import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { addSelectedBlog, removeSelectedBlog } from '../utils/selectedBlogSlice'
import toast from 'react-hot-toast'
import Comment from "../components/Comment";
import { setIsOpen } from "../utils/commentSlice";

function BlogPage() {
    const {id} = useParams()
  
    const [isLike,setIsLike] = useState(false)

    const dispatch = useDispatch()
    // const user = JSON.parse(localStorage.getItem("user"))

    // useselector gives all slices of store here we have to select which slice we want
    const { token, email, id: userId } = useSelector((state) => state.user);
    const { likes, comments, content } = useSelector(
    (state) => state.selectedBlog
  );
  const { isOpen } = useSelector((state) => state.comment);
    
    const [blogData , setBlogData] = useState(null)
    
    //function for getting the blog data from id
    async function getBlogById() {
     try {
         let {
        data: { blog },
      } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blogs/${id}`)
        setBlogData(blog)

              dispatch(addSelectedBlog(blog));
        if(blog.Likes.includes(userId)){
                        setIsLike(prev => !prev)
        }
     } catch (error) {
      console.log(error)
     }
    }

    useEffect(()=>{
      getBlogById()

      return ()=>{
         dispatch(setIsOpen(false))
      if (window.location.pathname !== `/edit/${id}` && window.location.pathname !== `/blogs/${id}`) {
        dispatch(removeSelectedBlog());
      }
      };

    },[id])

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
    <div className=' max-w-[1000px] mx-auto'>
      {
        blogData ? 
        <div className='flex flex-col items-center mx-auto h-[300px] w-[600px]'>
          <h1 className='font-bold text-3xl mt-10 capitalize'>{blogData.title}</h1>
          <h2 className='my-5 text-2xl'>{blogData.creator.name}</h2>
          <img className='h-[400px] w-[400px]' src={blogData.image} alt="" />
          {token && blogData.creator.email== email && <Link to={"/edit/" + blogData.blogId}>
                      <button className='bg-green-500 mt-4 px-3  py-2 rounded-xl cursor-pointer'>Edit</button> 

          </Link>}
          {/* like and comment butons */}
          <div className='flex gap-3.5 mt-4'>
            
            {/* like button */}
              <div 
                className='cursor-pointer flex gap-1'>
                {isLike ? 
                <i onClick={handleLike} className="fi fi-sr-thumbs-up text-3xl"></i>
                 :
                //  unlike formed button of like
                  <i onClick={handleLike} className="fi fi-br-social-network text-3xl"></i>
                   }
                   {/* like count */}
                <p className='text-3xl'>{blogData.Likes.length}</p>
              </div>

                   {/* comment button */}
              <div className='cursor-pointer flex gap-1 '>
                 <i
                onClick={() => dispatch(setIsOpen())}
                className="fi fi-sr-comment-alt text-3xl mt-1"
              ></i>
             <p className="text-2xl">{blogData.comments?.length ?? 0}</p>

              </div>
              
          </div>
                             <div className="my-10">
            {content.blocks.map((block) => {
              if (block.type == "header") {
                if (block.data.level == 2) {
                  return (
                    <h2 className="font-bold text-4xl my-4"
                      dangerouslySetInnerHTML={{ __html: block.data.text }}
                    ></h2>
                  );
                } else if (block.data.level == 3) {
                  return (
                    <h3 className="font-bold text-3xl my-4"
                      dangerouslySetInnerHTML={{ __html: block.data.text }}
                    ></h3>
                  );
                } else if (block.data.level == 4) {
                  return (
                    <h4  className="font-bold text-2xl my-4"
                      dangerouslySetInnerHTML={{ __html: block.data.text }}
                    ></h4>
                  );
                }
              } else if (block.type == "paragraph") {
                return (
                  <p className="my-4" dangerouslySetInnerHTML={{ __html: block.data.text }}></p>
                );
              }
              else if (block.type == "image") {
                return (
                  <div className="my-4">
                    <img src={block.data.file.url} alt="" />
                    <p className="text-center my-2">{block.data.caption}</p>
                  </div>
                );
              }

            })}
          </div>
        </div>
        
        : (<h1>Loading...</h1>)
      }
            {isOpen && <Comment />}
    </div>
  )
}

export default BlogPage
