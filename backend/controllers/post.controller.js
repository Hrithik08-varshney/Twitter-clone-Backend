import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { v2 as cloudinary } from "cloudinary";
import Notification from "../models/notification.model.js";

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

export const commentOnPost = async (req, res) => {
  try {
    //Extracts the text field from the request body. This is the content of the comment.
    const { text } = req.body;
    //Gets the post ID from the route parameters (e.g., /posts/:id).
    const postId = req.params.id;
    //Gets the user ID of the currently authenticated user. Assumes authentication middleware has set req.user.
    const userId = req.user._id;
    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    //Creates a new comment object with the user's ID and comment text.
    const comment = { user: userId, text };
    //Adds the comment to the comments array of the post.
    post.comments.push(comment);
    res.status(200).json(post);
  } catch (error) {
    console.log("Error in commentOnPost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    //Get Authenticated User's ID
    const userId = req.user._id;
    //Get Post ID from Request Params
    const { id: postId } = req.params;
    //Find the Post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({ error: "Post not found" });
    }
    //Check if User Already Liked the Post
    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      //If Already Liked → Unlike the Post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "Post unliked successfully" });
    } else {
      //If Not Liked Yet → Like the Post
      post.likes.push(userId);
      await post.save();
      const notification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });
      //Create a Notification
      await notification.save();
      res.status(200).json({ message: "Post liked successfully" });
    }
  } catch (error) {
    console.log("Error in likeUnlikePost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllPosts = (req,res) => {

}
