import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ceylon Harvest</h1>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="home" className="hero">
          <h2>Welcome to Ceylon Harvest</h2>
          <p>Your trusted partner in farming solutions.</p>
        </section>
        <section id="about" className="about">
          <h2>About Us</h2>
          <p>We are dedicated to providing the best farming solutions for our community.</p>
        </section>
        <section id="services" className="services">
          <h2>Our Services</h2>
          <ul>
            <li>Organic Farming</li>
            <li>Agricultural Consulting</li>
            <li>Equipment Rental</li>
          </ul>
        </section>
        <section id="contact" className="contact">
          <h2>Contact Us</h2>
          <p>Email: info@ceylonharvest.com</p>
          <p>Phone: (123) 456-7890</p>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Ceylon Harvest. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;