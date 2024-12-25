import express from "express";
import authRoutes from "./routes/auth.routes.js"
//Initializes an Express application. This app object will be used to define routes and middleware for the server.
const app = express();

//It is used to apply middleware or define routes for specific paths.
app.use("/api/auth", authRoutes);

//Starts the server and listens for incoming requests on the specified port
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
