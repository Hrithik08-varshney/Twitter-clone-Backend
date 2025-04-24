import express from "express";
import {
  getMe,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

//The router object allows you to define routes separately and organize them logically.
// Later, this router will be linked to the main app using app.use().
const router = express.Router();

//get current user information with protectRoute as middleware
router.get("/me", protectRoute, getMe);

//The path for this route. When a request is made to /signup, this route will handle it.
router.post("/signup", signup);

//login
router.post("/login", login);

//logout
router.post("/logout", logout);

export default router;
