import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

//The router object allows you to define routes separately and organize them logically.
// Later, this router will be linked to the main app using app.use().
const router = express.Router();

//The path for this route. When a request is made to /signup, this route will handle it.
router.post("/signup", signup);

router.post("/login",login);

router.post("/logout", logout);

export default router;
