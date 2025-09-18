import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <main className="app-container text-center">
            <section className="card" style={{ maxWidth: "800px", margin: "2rem auto" }}>
                <h1>Welcome to the Fitness Tracker</h1>
                <p style={{ margin: "1rem 0" }}>
                    This full stack Fitness Tracker allows you to browse exercises, track your workouts, 
                    and view exercise videos — all in one place.
                </p>
                <h2>Key Features</h2>
                <ul style={{ textAlign: "left", margin: "1rem 0", listStyle: "disc inside" }}>
                    <li>Browse exercises by body part, target muscle, or equipment</li>
                    <li>View detailed instructions and GIFs for exercises</li>
                    <li>Watch YouTube exercise videos directly from the app</li>
                    <li>Create, update, and delete your workouts</li>
                    <li>Secure user authentication with JWT</li>
                    <li>Responsive light/dark theme toggle</li>
                </ul>
                <h2>Getting Started</h2>
                <p style={{ margin: "1rem 0" }}>
                    To get started, please{" "}
                    <Link to="/signup" className="btn btn-primary">
                        Sign Up
                    </Link>{" "}
                    or{" "}
                    <Link to="/login" className="btn btn-primary">
                        Log In
                    </Link>
                    .
                </p>
                <p style={{ fontStyle: "italic", marginTop: "2rem" }}>
                    Note: The backend server may take a few minutes to boot up on first deployment.
                </p>
            </section>
        </main>
    );
};

export default Home;
