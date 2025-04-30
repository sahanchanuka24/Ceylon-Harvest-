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

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      alert('An error occurred');
      console.error('Error:', error);
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
            Welcome back,
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="User Name"
              name="email"
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
              sx={{ mb: 2 }}
            />
            <Box sx={{ textAlign: 'right', mb: 3 }}>
              <Link href="#" underline="none" sx={{ color: '#26580F' }}>
                Forgot password?
              </Link>
            </Box>
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
              Log In
            </Button>
            <Typography align="center" sx={{ mb: 3 }}>
              If you haven't ceylon harvest account yet?{' '}
              <Link href="/register" underline="none" sx={{ color: '#26580F', fontWeight: 'bold' }}>
                Register Now
              </Link>
            </Typography>
            <SocialButton startIcon={<GoogleIcon />}>
              Sign in with Google
            </SocialButton>
            <SocialButton startIcon={<FacebookIcon />}>
              Sign in with facebook
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
          <img
            src="https://images.unsplash.com/photo-1447175008436-054170c2e979?q=80&w=1000&auto=format&fit=crop"
            alt="Carrots"
          />
        </ImageContainer>
      </Container>
    </RootContainer>
  );
}

export default Login; 