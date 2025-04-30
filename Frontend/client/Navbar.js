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