import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/images/hermoz.png';  // Adjust the path to your logo image

const Logo = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/file_upload'); // Replace '/target-page' with your desired route
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img src={logoImage} alt="Logo" style={{ borderRadius: '0%', width: '100px', height: '50px', marginRight: '1041px' }} />
      </Box>
      
    </Box>


  );
};

export default Logo;
