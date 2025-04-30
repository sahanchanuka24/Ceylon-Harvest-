import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./FarmerRegister.css";

const FarmerRegister = () => {
  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-form">
          <h2>Farmer Registration</h2>
          <form>
            <label>Name</label>
            <input type="text" placeholder="Enter your name" />

            <label>Address</label>
            <input type="text" placeholder="Enter your address" />

            <label>National Identity Card (NIC)</label>
            <input type="text" placeholder="Enter NIC number" />

            <label>Phone Number</label>
            <div className="phone-input">
              <span>+94</span>
              <input type="text" placeholder="77XXXXXXX" />
            </div>

            <label>Email</label>
            <input type="email" placeholder="Enter your email" />

            <label>No. of Hectares of Farm</label>
            <input type="number" placeholder="Enter farm size" />

            <button type="submit" className="register-btn">Submit</button>
          </form>
          <Link to="/" className="back-link">Back to Login</Link>
        </div>
      </div>
      <div className="register-image">
        <img src="farmer.jpg" alt="Farmer" />
      </div>
    </div>
  );
};

export default FarmerRegister;