# Fitness Tracker MERN App

A full stack fitness tracking application built with the MERN stack (MongoDB, Express, React, Node.js). Users can register, log in, explore exercises, watch related videos, and create personalized workout plans.

---

Here's the GitHub Repository for Backend Express, MongoDB, and Node Server to be used with the Frontend Applicaiton: https://github.com/pahmatug81042/physical-fitness-tracker-backend.

---

Here's the deployed frontend on Netlify: https://profound-sunshine-034413.netlify.app/

---

Here is the deployed backend on Render: https://physical-fitness-tracker-backend.onrender.com/

* Important Note: It will take a few minutes for the server to wake up if it was left idle for sometime to cause it to go to sleep so please beware of that.

---

## 🚀 Features

- **User Authentication** – Secure signup and login with JWT-based authentication  
- **Exercise Library** – Browse exercises by body part, target muscle, or equipment  
- **Video Integration** – Watch exercise demonstration videos powered by YouTube API  
- **Workout Management** – Create, update, and delete custom workouts with multiple exercises  
- **Responsive UI** – Optimized for mobile, tablet, and desktop devices  
- **Theme Toggle** – Switch between light and dark modes  

---

## 🛠️ Technologies Used

- **Frontend:** React (Vite), Context API, React Router, CSS  
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)  
- **Authentication:** JWT, bcrypt  
- **APIs:** RapidAPI for exercises and videos  
- **Deployment:** Render (backend), Netlify (frontend)  

---

## ⚙️ Environment Variables

```.env
### Frontend `.env`
VITE_API_BASE_URL=https://your-backend-url.onrender.com
VITE_RAPID_API_KEY=your-rapidapi-key

### Backend `.env`
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
RAPIDAPI_KEY=your-rapidapi-key
EXERCISEDB_HOST=exercisedb.p.rapidapi.com
YOUTUBE_HOST=youtube-search-and-download.p.rapidapi.com
PORT=5000

```
## Installation & Setup
```bash
git clone
cd <frontend folder>
npm install
npm run dev
```

## Frontend will run on:
http://localhost:5173

## 🌐 Deployment (Netlify)
1. Push frontend repo to GitHub
2. Create a new site on Netlify
3. Add environment variable VITE_API_BASE_URL in Netlify settings
4. Deploy — you’ll get a live public frontend URL

## Backend
### Installation & Setup
```bash
git clone
cd <backend folder>
npm install
npm run dev
```

### Backend will run on:
http://localhost:5000

## 🌐 Deployment (Render)
1. Push backend repo to GitHub
2. Create a new Web Service on Render
3. Add environment variables from backend .env in Render settings
4. Deploy — you’ll get a live backend API URL

## ✅ Live Demo
* Add progress tracking and analytics
* Save favorite exercises
* Social features (share workouts with friends)
* Integration with wearable devices

## 🙌 Acknowledgments
* RapidAPI for exercise and video data
* MongoDB Atlas for database hosting
* Render and Netlify for deployment
