import express from "express";

//The router object allows you to define routes separately and organize them logically.
// Later, this router will be linked to the main app using app.use().
const router = express.Router();

//The path for this route. When a request is made to /signup, this route will handle it.
router.get("/signup", (req, res) => {

  //Sends a JSON response to the client. Here, it sends a JSON object with a data property.
  res.json({
    data: "You hit the signup endpoint",
  });
});

export default router;
