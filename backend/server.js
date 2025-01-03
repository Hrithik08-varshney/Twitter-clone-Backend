import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";

//This initializes the dotenv library and
// loads the variables defined in a .env file into process.env.
dotenv.config();
//Initializes an Express application. This app object will be used to define routes and middleware for the server.
const app = express();
const PORT = process.env.PORT || 8000;

//The line app.use(express.json()); is used in an Express.js
//application to parse incoming JSON payloads in the request body
app.use(express.json());

//to parse form data(urlencoded) - postman form encoded
app.use(express.urlencoded({ extended: true }));

//It is used to apply middleware or define routes for specific paths.
app.use("/api/auth", authRoutes);

//Starts the server and listens for incoming requests on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectMongoDB();
});
