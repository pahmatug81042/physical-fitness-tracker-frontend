import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="app-container text-center">
      <section className="card" style={{ maxWidth: "800px", margin: "2rem auto" }}>
        <h1 style={{ marginBottom: "1rem" }}>Welcome to the Fitness Tracker</h1>
        <p style={{ margin: "1rem 0" }}>
          This full stack Fitness Tracker allows you to browse exercises, track your workouts,
          and view exercise videos — all in one place.
        </p>

        <h2 style={{ marginTop: "2rem" }}>Key Features</h2>
        <ul style={{ textAlign: "left", margin: "1rem 0", listStyle: "disc inside" }}>
          <li>Browse exercises by body part, target muscle, or equipment</li>
          <li>View detailed instructions and GIFs for exercises</li>
          <li>Watch YouTube exercise videos directly from the app</li>
          <li>Create, update, and delete your workouts</li>
          <li>Update and delete exercises in your workouts</li>
          <li>Secure user authentication with JWT</li>
          <li>Responsive light/dark theme toggle</li>
        </ul>

        <h2 style={{ marginTop: "2rem" }}>Getting Started</h2>
        <p style={{ margin: "1.5rem 0", fontSize: "1.1rem" }}>
          To get started, please:
        </p>

        <div className="home-buttons" style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/signup" className="btn btn-primary" style={{ minWidth: "120px" }}>
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-primary" style={{ minWidth: "120px", backgroundColor: "var(--btn-primary-hover)" }}>
            Log In
          </Link>
        </div>

        <p style={{ fontStyle: "italic", marginTop: "3rem" }}>
          Note: The backend server may take a few minutes to boot up on first deployment.
        </p>
      </section>
    </main>
  );
};

export default Home;
