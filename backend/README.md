# Twitter Clone Backend

This folder contains the backend code for your Twitter clone project.  
It is built with Node.js, Express, MongoDB, and uses Cloudinary for image uploads.

## Folder Structure

- **server.js**  
  Main entry point for the backend server. Sets up Express, middleware, routes, and static file serving for production.

- **/routes**  
  Contains route files for authentication, users, posts, and notifications:
  - `auth.route.js`
  - `user.route.js`
  - `post.route.js`
  - `notification.route.js`

- **/db**
  - `connectMongoDB.js`: Handles MongoDB connection.

## Main Features

- **Authentication:**  
  JWT-based authentication for users.

- **User Management:**  
  Profile updates, following/unfollowing users, image uploads (profile/cover).

- **Posts:**  
  CRUD operations for posts.

- **Notifications:**  
  Basic notification system for user actions.

- **Image Uploads:**  
  Uses Cloudinary for storing profile and cover images.

## Environment Variables

Create a `.env` file in the root with the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=8000
NODE_ENV=development
```

## Scripts

- `npm run dev`  
  Starts the server in development mode with nodemon.

- `npm start`  
  Starts the server in production mode.

- `npm run build`  
  Installs dependencies and builds the frontend.

## API Endpoints

- `/api/auth`  
  Authentication routes (register, login, logout).

- `/api/users`  
  User profile, follow/unfollow, update profile.

- `/api/posts`  
  Post creation, fetching, liking, deleting.

- `/api/notifications`  
  Notification-related endpoints.

## Static File Serving

In production, the backend serves the React frontend from `frontend/dist`.

## Notes

- The backend uses ES modules (`type: "module"` in package.json).
- Images are uploaded to Cloudinary, not stored locally.
- Make sure MongoDB and Cloudinary credentials are set in `.env`.

---

**For future development:**  
- Add more validation and error handling.
- Consider rate limiting and security improvements.
- Expand notification and