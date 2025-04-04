import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
  try {
    // Extracting Data from the Request
    const { text } = req.body;
    let { img } = req.body;
    const userId = req.user._id.toString();
    //Checking if the User Exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    //Validating Post Content
    if (!text && !img) {
      return res.status(400).json({ error: "Post must have text or image" });
    }
    //Uploading Image to Cloudinary
    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }
    //Creating and Saving the Post
    const newPost = new Post({
      user: userId,
      text,
      img,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in createPost controller: ", error);
  }
};

export const deletePost = async (req, res) => {
  try {
    //Retrieve the Post by ID
    const post = await Post.findById(req.params.id);
    //Check if Post Exists
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    //Check Authorization
    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to delete this post" });
    }
    //Delete Image from Cloudinary (if it exists)
    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }
    //Delete the Post from the Database
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Error in deletePost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
