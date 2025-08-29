# Twitter Clone Frontend

This folder contains the frontend code for your Twitter clone project.  
It is built with React, React Router, and Tailwind CSS.

## Folder Structure

- **/src**
  - `App.jsx` — Main application component and routing.
  - `/pages` — Contains page components (e.g., Home, Profile, Login, Register).
  - `/components` — Reusable UI components (e.g., Navbar, Post, ProfileHeader).
  - `/hooks` — Custom React hooks (e.g., useFollow, useUpdateUserProfile).
  - `/utils` — Utility functions (e.g., date formatting).
  - `/assets` — Static assets like images and icons.

## Main Features

- **Authentication:**  
  Login, register, and protected routes.

- **User Profiles:**  
  View and edit profiles, follow/unfollow users, upload profile and cover images.

- **Posts:**  
  Create, view, like, and delete posts.

- **Notifications:**  
  View notifications for user actions.

- **Responsive UI:**  
  Styled with Tailwind CSS for a modern look.

## Environment Variables

Create a `.env` file in the frontend root with:

```
VITE_API_URL=http://localhost:8000
```

Adjust the API URL as needed for your backend.

## Scripts

- `npm start`  
  Runs the app in development mode.

- `npm run build`  
  Builds the app for production to the `dist` folder.

- `npm install`  
  Installs dependencies.

## Notes

- The frontend communicates with the backend via REST API.
- Profile and cover images are uploaded to Cloudinary through the backend.
- Uses React Query for data fetching and caching.
- Make sure the backend is running and accessible at the API URL specified in `.env`.

---

**For future development:**  
- Add more UI feedback and error handling.
- Improve accessibility and mobile responsiveness.
- Expand features (e.g., direct messaging,