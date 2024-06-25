import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/images/hermoz.png';  // Adjust the path to your logo image

const Logo = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/'); // Replace '/target-page' with your desired route
  };
  const handleRedirect1 = () => {
    navigate('/analyze'); // Replace '/target-page' with your desired route
  };
  const handleRedirect2 = () => {
    navigate('/Compare'); // Replace '/target-page' with your desired route
  };
  const handleRedirect3 = () => {
    navigate('/file_upload'); // Replace '/target-page' with your desired route
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img src={logoImage} alt="Logo" style={{ borderRadius: '0%', width: '100px', height: '50px', marginRight: '750px' }} />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 1 }} >
        <Button variant="contained" color="primary" onClick={handleRedirect}>
          Home
        </Button>
        <Button variant="contained" color="primary" onClick={handleRedirect1}>
          Analyze
        </Button>
        <Button variant="contained" color="primary" onClick={handleRedirect2}>
          Compare
        </Button>
        <Button variant="contained" color="primary" onClick={handleRedirect3}>
          Upload File
        </Button>
      </Box>
    </Box>
  );
};

export default Logo;
