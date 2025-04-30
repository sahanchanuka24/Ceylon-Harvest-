//I'am Thidas and I Love Sri Lanka
//I am king

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

//ole ole ole
//sahan
//sri lanka

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Badge,
} from '@mui/material';
import {
  Person as PersonIcon,
  Logout as LogoutIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = function(event) {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = function() {
    setAnchorEl(null);
  };

  const handleLogout = function() {
    localStorage.removeItem('token');
    handleMenuClose();
    window.location.href = '/';
  };

  const handleCartClick = function() {
    window.location.href = '/cart';
  };

  return React.createElement(
    AppBar,
    {
      position: 'fixed',
      color: 'transparent',
      sx: { backdropFilter: 'blur(8px)' }
    },
    React.createElement(
      Toolbar,
      null,
      React.createElement(
        Typography,
        {
          variant: 'h6',
          component: 'div',
          sx: { flexGrow: 1, color: '#26580F' }
        },
        'Ceylon Harvest'
      ),
      React.createElement(
        Button,
        {
          component: Link,
          to: '/home',
          sx: { color: '#26580F' }
        },
        'Home'
      ),
      React.createElement(
        Button,
        {
          component: Link,
          to: '/discussions',
          sx: { color: '#26580F' }
        },
        'Discussions'
      ),
      React.createElement(
        Button,
        {
          component: Link,
          to: '/contact',
          sx: { color: '#26580F' }
        },
        'Contact'
      ),
      React.createElement(
        Button,
        {
          component: Link,
          to: '/about',
          sx: { color: '#26580F' }
        },
        'About Us'
      ),
      React.createElement(
        IconButton,
        {
          onClick: handleCartClick,
          sx: { color: '#26580F', ml: 1 }
        },
        React.createElement(
          Badge,
          { badgeContent: 0, color: 'error' },
          React.createElement(ShoppingCartIcon, null)
        )
      ),
      React.createElement(
        IconButton,
        {
          onClick: handleProfileClick,
          sx: { ml: 2 }
        },
        React.createElement(Avatar, null)
      ),
      React.createElement(
        Menu,
        {
          anchorEl: anchorEl,
          open: Boolean(anchorEl),
          onClose: handleMenuClose,
          PaperProps: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
          transformOrigin: { horizontal: 'right', vertical: 'top' },
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' }
        },
        React.createElement(
          MenuItem,
          { onClick: handleMenuClose },
          React.createElement(
            ListItemIcon,
            null,
            React.createElement(PersonIcon, { fontSize: 'small', sx: { color: '#26580F' } })
          ),
          React.createElement(ListItemText, null, 'Profile')
        ),
        React.createElement(
          MenuItem,
          { onClick: handleLogout },
          React.createElement(
            ListItemIcon,
            null,
            React.createElement(LogoutIcon, { fontSize: 'small', sx: { color: '#26580F' } })
          ),
          React.createElement(ListItemText, null, 'Logout')
        )
      )
    )
  );
}

export default Navbar;

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
<<<<<<< HEAD
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
=======
      <main className="app-main">
        <section className="upload-section">
          <form onSubmit={handleSubmit}>
            <div className="file-input-container">
              <label htmlFor="file-upload" className="custom-file-upload">
                Choose Image
              </label>
              <input 
                id="file-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
              {selectedFile && (
                <span className="file-name">{selectedFile.name}</span>
              )}
            </div>
            
            {previewUrl && (
              <div className="preview-container">
                <img src={previewUrl} alt="Preview" className="image-preview" />  
              </div>
            )}
            
            <button 
              type="submit" 
              className="submit-button" 
              disabled={isLoading || !selectedFile}
            >
              {isLoading ? 'Identifying...' : 'Identify Disease'}
            </button>
          </form>
          
          {error && <p className="error-message">{error}</p>}
>>>>>>> 055d1bf8b8d6033c2477ba271dd9489bd5631fac
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Ceylon Harvest. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;