const Blog = require("../models/blogSchema");
const Comment = require("../models/CommentSchema");
const User = require("../models/userSchema");
const { uploadImage, deleteImageFromCloud } = require("../utils/uploadImage");
const fs = require("fs");
const ShortUniqueId = require('short-unique-id');
const { randomUUID } = new ShortUniqueId({ length: 10 });

// function to create blog
async function createBlog(req, res) {
  try {
    // here creator has the id of user which is coming from verifying jwt
    const creator = req.user;

    const { title, description, draft } = req.body;
    // taking the file from req.file
    const { image, images } = req.files;

    const content = JSON.parse(req.body.content);
    
    //creating a blog id for its url
    const blogId = title.toLowerCase().split(" ").join("-")+ "-" + randomUUID() // by simple methods
    //  const blogId = title.toLowerCase().replace(/ +/g, '-') // by regex

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "enter title",
      });
    }
    if (!description) {
      return res.status(400).json({
        success: false,
        message: "enter description",
      });
    }

    // finding if the given user id exist in user database or not
    const findUser = await User.findById(creator);

    if (!findUser) {
      return res.status(500).json({
        success: false,
        error: "creator does not exist",
      });
    }

        if (!content) {
      return res.status(400).json({
        message: "Please add some content",
      });
    }

    // taking the url of image
     let imageIndex = 0;

    for (let i = 0; i < content.blocks.length; i++) {
      const block = content.blocks[i];
      if (block.type === "image") {
        const { secure_url, public_id } = await uploadImage(
          `data:image/jpeg;base64,${images[imageIndex].buffer.toString(
            "base64"
          )}`
        );

        block.data.file = {
          url: secure_url,
          imageId: public_id,
        };

        imageIndex++;
      }
    }

    //deleting the image from its folder after getting the url
        const { secure_url, public_id } = await uploadImage(
      `data:image/jpeg;base64,${image[0].buffer.toString("base64")}`
    );

    

    // creating the blog with all these details
    const blog = await Blog.create({
      title,
      description,
      draft,
      creator,
      image: secure_url,
      imageId: public_id,
      blogId ,
      content,
    });

    // updating the user that he just uploaded the blog so providing id of that blog to user
    await User.findByIdAndUpdate(creator, { $push: { blogs: blog._id } }); // we are writing $push to push the updated thing in array

    return res.status(200).json({
      success: true,
      message: "blog created successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// function to get blog
async function getBlogs(req, res) {
  try {
    const blogs = await Blog.find({ draft: false })
      .populate({
        path: "creator",
        select: "name",
      })
      .populate({
        path: "Likes",
        select: "name email",
      }); // here populate give the object of given id or path

    return res.status(200).json({
      success: true,
      message: "blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// function to get blog by id
async function getBlogById(req, res) {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findOne({blogId})
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name  email",
        },
      })
      .populate({
        path: "creator",
        select: "name email",
      });

      if(!blog){
        return res.status(404).json({
      success: false,
      message: "blog not found",
    });
      }

    return res.status(200).json({
      success: true,
      message: "blog fetched successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// function to update blog
async function updateBlog(req, res) {
  try {
    console.log("reached at update blog controller")
    // taking id for checking is the provided id blog present in db or not
    const { id } = req.params;
    // taking creator id to check is the blog containing creator id same or not
    const creator = req.user;
    
    const { title, description, draft } = req.body;

        const content = JSON.parse(req.body.content);
    const existingImages = JSON.parse(req.body.existingImages);

    // finding the blog on the basis of id
    const blog = await Blog.findOne({blogId : id})

    if(!blog){
      return res.status(500).json({
        message : "Blog is not found",
      })
    }

    if (!(creator == blog.creator)) {
      return res.status(500).json({
        success: false,
        error: "You are not authorized for this action",
      });
    }

    let imagesToDelete = blog.content.blocks
      .filter((block) => block.type == "image")
      .filter(
        (block) => !existingImages.find(({ url }) => url == block.data.file.url)
      )
      .map((block) => block.data.file.imageId);

    // if (imagesToDelete.length > 0) {
    //   await Promise.all(
    //     imagesToDelete.map((id) => deleteImagefromCloudinary(id))
    //   );
    // }

    if (req.files.images) {
      let imageIndex = 0;

      for (let i = 0; i < content.blocks.length; i++) {
        const block = content.blocks[i];
        if (block.type === "image" && block.data.file.image) {
          const { secure_url, public_id } = await uploadImage(
            `data:image/jpeg;base64,${req.files.images[
              imageIndex
            ].buffer.toString("base64")}`
          );

          block.data.file = {
            url: secure_url,
            imageId: public_id,
          };

          imageIndex++;
        }
      }
    }



    //if image is present to update then remove it from cloudinary then upload new image and them set its detail in db then remove new image from system
     if (req?.files?.image){
      await deleteImageFromCloud(blog.imageId)
      const {secure_url , public_id} = await uploadImage(`data:image/jpeg;base64,${req?.files?.image[0]?.buffer?.toString("base64")}`)
      blog.image = secure_url
      blog.imageId = public_id
    }

    // using this to update the blog and return it
    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.draft = draft || blog.draft;
        blog.content = content || blog.content;

    blog.save();

    return res.status(200).json({
      success: true,
      message: "blog updated successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// function to delete blog
async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    const creator = req.user;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(500).json({
        success: false,
        error: "Blog not found",
      });
    }

    if (!(creator == blog.creator)) {
      return res.status(500).json({
        success: false,
        error: "You are not authorized for this action",
      });
    }

    //deleting the image from cloudinary from its source url
    await deleteImageFromCloud(blog.imageId);

    await Blog.findByIdAndDelete(id);

    // deleting the id of blog from user document
    await User.findByIdAndUpdate(creator, { $pull: { blogs: id } });

    return res.status(200).json({
      success: true,
      message: "blog deleted successfully",
      deleteBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// function to like or unlike a blog
async function LikeBlog(req, res) {
  try {
    // taking the id which blog has to be liked (doing this if someone req from postman)
    const { id } = req.params;
    //taking the id of creator who is liking it
    const creator = req.user;

    // finding the blog from db
    const blog = await Blog.findById(id);

    // cheking if the blog is present or not
    if (!(blog.id == id)) {
      return res.status(500).json({
        success: false,
        message: "blog not found",
      });
    }

    // putting the creator and removing on the basis of operation
    if (!blog.Likes.includes(creator)) {
      await Blog.findByIdAndUpdate(id, {
        $push: { Likes: creator },
      });

      return res.status(200).json({
        success: true,
        message: "blog liked",
      });
    } else {
      await Blog.findByIdAndUpdate(id, {
        $pull: { Likes: creator },
      });

      return res.status(200).json({
        success: false,
        message: "blog unliked",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  LikeBlog,
};
