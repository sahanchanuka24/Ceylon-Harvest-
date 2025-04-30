import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form">
          <h2>Welcome back,</h2>
          <form>
            <label>User Name</label>
            <input type="text" placeholder="Enter your username" />

            <label>Password</label>
            <input type="password" placeholder="Enter your password" />

            <a href="#" className="forgot-password">Forgot password?</a>
            <button type="submit" className="login-btn">Log In</button>
          </form>
          <p>
            If you haven’t account yet?{" "}
            <Link to="/register" className="register-link">Register Now</Link>
          </p>
          <a href="#" className="farmer-link">Continue as a farmer</a>
        </div>
      </div>
      <div className="login-image">
        <img src="farmer.jpg" alt="Farmer" />
      </div>
    </div>
  );
};

export default Login;