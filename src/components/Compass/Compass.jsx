import React from 'react';
import { Box } from '@mui/material';
import CompassSVG from '../../assets/compass.svg'; 
const Compass = ({ rotation }) => {
  const rotationStyle = {
    transform: `rotate(${-rotation}deg)`,
    objectFit: 'contain',
    maxWidth: '100%',
  };

  return (
    <Box>
      <img src={CompassSVG} alt="Compass" style={rotationStyle}/>
    </Box>
  );
};

export default Compass;
