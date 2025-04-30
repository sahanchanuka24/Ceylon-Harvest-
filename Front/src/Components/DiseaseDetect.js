import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Box, Typography, Button, Container } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const UploadBox = styled(Box)({
  border: '2px dashed #ccc',
  borderRadius: '8px',
  padding: '40px',
  textAlign: 'center',
  backgroundColor: '#fff',
  cursor: 'pointer',
  minHeight: '300px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    borderColor: '#2e7d32',
  }
});

const GenerateButton = styled(Button)({
  backgroundColor: '#1b5e20',
  color: 'white',
  padding: '15px',
  width: '100%',
  fontSize: '18px',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: '#2e7d32',
  }
});

const DiseaseDetect = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 3 }}>
        Disease Detect
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
        Quickly identify crop diseases with AI-powered analysis. Upload images or describe symptoms to get accurate diagnoses and recommended treatments, helping you protect your harvest and ensure healthy crop growth.
      </Typography>

      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        id="image-upload"
        onChange={handleImageUpload}
      />
      
      <label htmlFor="image-upload" style={{ width: '100%' }}>
        <UploadBox>
          <CloudUploadIcon sx={{ fontSize: 60, color: '#666', mb: 2 }} />
          <Typography variant="h5" component="div" sx={{ mb: 1 }}>
            Upload Your Crop Image
          </Typography>
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Selected crop" 
              style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '20px' }}
            />
          )}
        </UploadBox>
      </label>

      <GenerateButton variant="contained">
        Generate
      </GenerateButton>
    </Container>
  );
};

export default DiseaseDetect; 