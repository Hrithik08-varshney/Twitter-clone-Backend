import mongoose from "mongoose";

//Creates a schema (structure) for the User collection in MongoDB.
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    profileImage: {
      type: String,
      default: "",
    },
    coverImg: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

//Converts the userSchema into a usable model.
const User = mongoose.modelNames("User", userSchema);
//The model represents the users collection in MongoDB (automatically pluralized).

export default User;
