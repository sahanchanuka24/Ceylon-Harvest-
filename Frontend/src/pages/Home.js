import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ForumIcon from '@mui/icons-material/Forum';
import BugReportIcon from '@mui/icons-material/BugReport';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'url(https://source.unsplash.com/random/?farming)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '80vh',
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  }
}));

const ServiceCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
  }
}));

function Home() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    handleMenuClose();
    navigate('/');
  };

  return (
    <Box>
      {/* Navigation Bar */}
      <AppBar position="fixed" color="transparent" sx={{ backdropFilter: 'blur(8px)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#26580F' }}>
            Ceylon Harverst
          </Typography>
          <Button color="inherit" sx={{ color: '#26580F' }}>Home</Button>
          <Button color="inherit" sx={{ color: '#26580F' }}>Discussions</Button>
          <Button color="inherit" sx={{ color: '#26580F' }}>Contact</Button>
          <Button color="inherit" sx={{ color: '#26580F' }}>About Us</Button>
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
            <MenuItem onClick={handleProfile}>
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

      {/* Hero Section */}
      <HeroSection>
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Empowering Sri Lankan
          </Typography>
          <Typography variant="h1" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
            Farmers
          </Typography>
          <Typography variant="h4" gutterBottom>
            with Smart Solutions
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 4,
              backgroundColor: '#26580F',
              '&:hover': { backgroundColor: '#1b3f0a' }
            }}
          >
            Get Started
          </Button>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Connect with farmers, get real-time insights and optimize your harvest
          </Typography>
        </Container>
      </HeroSection>

      {/* About Section */}
      <Container sx={{ my: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom>
          About Ceylone Harvest
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.2rem', maxWidth: '800px', mx: 'auto', textAlign: 'center' }}>
          Ceylone Harvest is a smart agriculture platform designed to support Sri Lankan farmers by providing real-time data, market trends, and expert advice.
          Our goal is to bridge the gap between farmers and modern technology, helping them make better decisions and increase productivity.
        </Typography>
      </Container>

      {/* Services Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
        <Container>
          <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 6 }}>
            Services We Provide
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <ServiceCard>
                <WbSunnyIcon sx={{ fontSize: 60, color: '#26580F', mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Weather & Alert
                </Typography>
                <Typography>
                  Real-time weather updates and instant farming alerts.
                </Typography>
              </ServiceCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <ServiceCard>
                <ForumIcon sx={{ fontSize: 60, color: '#26580F', mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Expert Discussion
                </Typography>
                <Typography>
                  Connect with experts for advice & best farming practices.
                </Typography>
              </ServiceCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <ServiceCard>
                <BugReportIcon sx={{ fontSize: 60, color: '#26580F', mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Disease Detection
                </Typography>
                <Typography>
                  Identify crop diseases early with AI-powered analysis.
                </Typography>
              </ServiceCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#26580F', color: 'white', py: 6 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Ceylon Harverst
              </Typography>
              <Typography variant="body2">
                Empowering Sri Lankan farmers with smart agricultural solutions by providing real-time insights, innovative tools, and expert guidance.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Button color="inherit">About Us</Button>
              <Button color="inherit">Weather & Alerts</Button>
              <Button color="inherit">Expert Discussion</Button>
              <Button color="inherit">Terms & Conditions</Button>
              <Button color="inherit">FAQs</Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2">support@ceyloneharvest.com</Typography>
              <Typography variant="body2">Colombo, Sri Lanka</Typography>
              <Box sx={{ mt: 2 }}>
                <IconButton color="inherit">
                  <InstagramIcon />
                </IconButton>
                <IconButton color="inherit">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="inherit">
                  <TwitterIcon />
                </IconButton>
                <IconButton color="inherit">
                  <YouTubeIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
          <Typography variant="body2" sx={{ mt: 4, textAlign: 'center' }}>
            © 2025 Ceylone Harvest. All Rights Reserved. | "Smart Farming, Better Harvests"
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Home; 