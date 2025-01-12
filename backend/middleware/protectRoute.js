import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const protectRoute = async (req, res, next) => {
  try {
    //getting the token from cookies
    const token = req.cookies.jwt;

    //if no token handling that case
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No Token Provided" });
    }

    //getting decoded token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //handling the invalid scenario
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }

    //valid token will have the user id so getting that user data removing the password
    const user = await User.findById(decoded.userId).select("-password");

    //if user does not exist handling that scenario
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //adding the user into the req object
    req.user = user;

    //calling the next function
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
