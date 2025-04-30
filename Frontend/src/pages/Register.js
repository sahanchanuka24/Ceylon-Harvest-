import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const RootContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#ffffff',
});

const FormContainer = styled(Box)({
  flex: 1,
  padding: '40px',
});

const ImageContainer = styled(Box)({
  flex: 1,
  height: '100vh',
  position: 'relative',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '20px',
  },
});

const SocialButton = styled(Button)({
  width: '100%',
  padding: '12px',
  marginBottom: '10px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: 'white',
  color: '#000',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      console.log('Sending registration request:', {
        name: formData.name,
        email: formData.email,
        password: formData.password.length // just log length for security
      });

      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log('Registration response:', data);

      if (response.ok) {
        // Store the token
        localStorage.setItem('token', data.token);
        alert('Registration successful! Please login.');
        navigate('/');
      } else {
        // Show specific error message from server
        if (data.errors && data.errors.length > 0) {
          alert(data.errors[0].msg);
        } else if (data.message) {
          alert(data.message);
        } else {
          alert('Registration failed. Please try again.');
        }
        console.error('Registration failed:', data);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };

  return (
    <RootContainer>
      <Container maxWidth="xl" sx={{ display: 'flex', gap: 4 }}>
        <FormContainer>
          <Typography
            variant="h4"
            component="div"
            sx={{ color: '#26580F', fontWeight: 'bold', mb: 4 }}
          >
            Ceylon Harverst
          </Typography>
          <Typography variant="h3" component="h1" sx={{ mb: 4 }}>
            Create Account,
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: '#26580F',
                py: 1.5,
                mb: 3,
                '&:hover': { bgcolor: '#1b3f0a' },
              }}
            >
              Create Account
            </Button>
            <Typography align="center" sx={{ mb: 3 }}>
              Already have an account?{' '}
              <Link href="/" underline="none" sx={{ color: '#26580F', fontWeight: 'bold' }}>
                Login Now
              </Link>
            </Typography>
            <SocialButton startIcon={<GoogleIcon />}>
              Sign up with Google
            </SocialButton>
            <SocialButton startIcon={<FacebookIcon />}>
              Sign up with facebook
            </SocialButton>
            <Typography align="center" sx={{ mt: 3 }}>
              Continue as a{' '}
              <Link href="#" underline="none" sx={{ color: '#26580F', fontWeight: 'bold' }}>
                expert
              </Link>
            </Typography>
          </Box>
        </FormContainer>
        <ImageContainer>
          
        </ImageContainer>
      </Container>
    </RootContainer>
  );
}

export default Register; 