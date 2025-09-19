import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ExerciseDetail from "./pages/ExerciseDetail";
import Dashboard from "./pages/Dashboard";
import ExerciseList from "./components/ExerciseList";
import WorkoutList from "./components/WorkoutList";
import WorkoutForm from "./components/WorkoutForm";
import WorkoutDetails from "./pages/WorkoutDetails";
import { AuthContext } from "./context/AuthContext";
import "./App.css";

// Wrapper for protecting private routes
const PrivateRoute = ({ children }) => {
  const { user, loadingAuth } = useContext(AuthContext);
  if (loadingAuth) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Exercise routes */}
        <Route path="/exercises" element={<ExerciseList />} />
        <Route path="/exercises/:id" element={<ExerciseDetail />} />

        {/* Optional: Redirect /exercise/:id ➜ /exercises/:id */}
        <Route
          path="/exercise/:id"
          element={({ params }) => <Navigate to={`/exercises/${params.id}`} replace />}
        />

        {/* Private routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/workouts"
          element={
            <PrivateRoute>
              <WorkoutList />
            </PrivateRoute>
          }
        />
        <Route
          path="/workouts/new"
          element={
            <PrivateRoute>
              <WorkoutForm />
            </PrivateRoute>
          }
        />
        {/* NEW: Workout details page */}
        <Route
          path="/workouts/:id"
          element={
            <PrivateRoute>
              <WorkoutDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;