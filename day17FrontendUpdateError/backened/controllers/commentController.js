const Blog = require("../models/blogSchema");
const Comment = require("../models/CommentSchema");

// to add a comment
async function addComment(req , res) {
  try {
       // taking the id which blog has to be commented (doing this if someone req from postman)
    const { id } = req.params;
    //taking the id of creator who is commenting on it
    const creator = req.user;

    // taking the comment from body
    const {comment} = req.body

    // checking if comment is not empty
    if(!comment){
       return res.status(500).json({
      success: false,
      message: "please add comment",
    });
    }

    // finding the blog from db
    const blog = await Blog.findById(id);

    // cheking if the blog is present or not
    if (!(blog.id == id)) {
      return res.status(500).json({
        success: false,
        message: "blog not found",
      });
    }

    const newComment = await Comment.create({
      blog : id,
      user : creator,
      comment
    })

      await Blog.findByIdAndUpdate(id , {
      $push : {Comments : newComment._id}
    })

    return res.status(200).json({
        success : true,
        message : "comment added successfully"
      })
  
    
  } catch (error) {
     return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

//to delete a comment 
async function deleteComment(req , res) {
  try {
       // taking the id which comment has to be deleted
    const  commentId  = req.params.id;
    //taking the userid who is the owner of blog
    const userId = req.user;


  const comment = await Comment.findById(commentId).populate(
    {path : "blog",
      select : "creator"
    }
  )


   // checking if comment is not empty
    if(!comment){
       return res.status(500).json({
      success: false,
      message: "comment not found",
    });
    }

    if(userId !=comment.user && userId != comment.blog.creator){
      return res.status(500).json({
      success: false,
      message : "You are not authorized for this action"
    });
    }
    
   //deleting comment from blog
    await Blog.findByIdAndUpdate( comment.blog._id, {$pull : {Comments : commentId}})
     // deleting comment from comments db
    await Comment.findByIdAndDelete(commentId)

    return res.status(200).json({
        success : true,
        message : "comment deleted successfully"
      })
  
    
  } catch (error) {
     return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// to edit a comment
async function editComment(req , res) {
  try {
       // taking the id which comment has to be edited (doing this if someone req from postman)
    const { id } = req.params;
    //taking the id of creator who is editing the comment on it
    const userId = req.user;

    // taking the to update  data from body
    const {updateComment} = req.body

    const comment =await Comment.findById(id)

    // checking if comment is present or not
    if(!comment){
       return res.status(500).json({
      success: false,
      message: "comment not found",
    });
    }

  if( comment.user != userId){
    return res.status(400).json({
      success: false,
      message : "You can not edit the comment"
    });
  }

  await Comment.findByIdAndUpdate(id , {comment : updateComment})

    return res.status(200).json({
        success : true,
        message : "comment updated successfully"
      })
  
    
  } catch (error) {
     return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// to like a comment or unlike 
async function likeCommment(req, res) {
  try {
    // taking the id which comment has to be liked (doing this if someone req from postman)
    const { id } = req.params;
    //taking the id of creator who is liking it
    const userId = req.user;

    // finding the comment from db
    const comment = await Comment.findById(id);

    // cheking if the blog is present or not
    if (!comment) {
      return res.status(500).json({
        success: false,
        message: "comment not found",
      });
    }

    // putting the creator and removing on the basis of operation
    if (!comment.Likes.includes(userId)) {
      await Comment.findByIdAndUpdate(id, {
        $push: { Likes: userId },
      });

      return res.status(200).json({
        success : true,
        message : "Comment liked"
      })
    } else{
      await Comment.findByIdAndUpdate(id, {
        $pull: { Likes: userId },
      });

      return res.status(200).json({
        success : false,
        message : "comment unliked"
      })
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  addComment,
  deleteComment,
  editComment,
  likeCommment
};
