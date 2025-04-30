import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FarmerRegister from './Components/FarmerRegister';
import Login from './Components/Login';
import DiseaseDetect from './Components/DiseaseDetect';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function App() {
  return (
    <Router>
      <div className="App">
        <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 1 }}>
          <Toolbar>
            <Typography variant="h6" component={Link} to="/" sx={{ 
              flexGrow: 1, 
              color: '#000', 
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              Ceylon Harverst
            </Typography>
            <Box>
              <Button component={Link} to="/" color="inherit" sx={{ color: '#000' }}>
                Home
              </Button>
              <Button component={Link} to="/discussions" color="inherit" sx={{ color: '#000' }}>
                Discussions
              </Button>
              <Button component={Link} to="/weather" color="inherit" sx={{ color: '#000' }}>
                Weather
              </Button>
              <Button 
                component={Link} 
                to="/disease-detect" 
                sx={{ 
                  color: '#1b5e20',
                  fontWeight: 'bold'
                }}
              >
                Disease Detect
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<FarmerRegister />} />
          <Route path="/disease-detect" element={<DiseaseDetect />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;