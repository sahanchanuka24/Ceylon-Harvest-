import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProfileContainer = styled(Container)({
  marginTop: '80px',
  marginBottom: '40px',
});

const ProfilePaper = styled(Paper)({
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const LargeAvatar = styled(Avatar)({
  width: '120px',
  height: '120px',
  marginBottom: '24px',
  backgroundColor: '#26580F',
  fontSize: '48px',
});

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleMenuClose();
    navigate('/');
  };

  const handleBack = () => {
    navigate('/home');
  };

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      const response = await fetch('http://localhost:8000/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setUserData(data);
      setEditData({
        name: data.name,
        email: data.email,
        password: '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const updateData = {
        name: editData.name,
        email: editData.email,
        ...(editData.password && { password: editData.password }),
      };

      const response = await fetch('http://localhost:8000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      setUserData(data.user);
      setIsEditing(false);
      setSuccess('Profile updated successfully');
      setError('');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message || 'Failed to update profile');
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/profile', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }

      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Error deleting profile:', error);
      setError('Failed to delete profile');
    }
    setDeleteDialogOpen(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: userData.name,
      email: userData.email,
      password: '',
    });
    setError('');
  };

  if (!userData) {
    return (
      <Box>
        <AppBar position="fixed" color="transparent" sx={{ backdropFilter: 'blur(8px)' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleBack}
              sx={{ mr: 2, color: '#26580F' }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#26580F' }}>
              Ceylon Harverst
            </Typography>
            <IconButton
              onClick={handleProfileClick}
              sx={{ ml: 2 }}
            >
              <Avatar />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
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
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" sx={{ color: '#26580F' }} />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" sx={{ color: '#26580F' }} />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <ProfileContainer>
          <Typography>Loading...</Typography>
        </ProfileContainer>
      </Box>
    );
  }

  return (
    <Box>
      <AppBar position="fixed" color="transparent" sx={{ backdropFilter: 'blur(8px)' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleBack}
            sx={{ mr: 2, color: '#26580F' }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#26580F' }}>
            Ceylon Harverst
          </Typography>
          <IconButton
            onClick={handleProfileClick}
            sx={{ ml: 2 }}
          >
            <Avatar />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
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
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <PersonIcon fontSize="small" sx={{ color: '#26580F' }} />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: '#26580F' }} />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <ProfileContainer maxWidth="md">
        <ProfilePaper elevation={3}>
          <LargeAvatar>{userData.name.charAt(0).toUpperCase()}</LargeAvatar>
          
          {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2, width: '100%' }}>{success}</Alert>}

          {isEditing ? (
            <Box component="form" sx={{ width: '100%', mt: 2 }}>
              <TextField
                fullWidth
                label="Name"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                margin="normal"
                required
                type="email"
              />
              <TextField
                fullWidth
                label="New Password (leave blank to keep current)"
                value={editData.password}
                onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                margin="normal"
                type="password"
              />
              <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  sx={{ bgcolor: '#26580F', '&:hover': { bgcolor: '#1b3f0a' } }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{ color: '#26580F', borderColor: '#26580F' }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                {userData.name}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {userData.email}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Member since: {new Date(userData.createdAt).toLocaleDateString()}
              </Typography>
              <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleEdit}
                  sx={{ bgcolor: '#26580F', '&:hover': { bgcolor: '#1b3f0a' } }}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  Delete Account
                </Button>
              </Box>
            </Box>
          )}
        </ProfilePaper>

        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete your account? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </ProfileContainer>
    </Box>
  );
}

export default Profile; 