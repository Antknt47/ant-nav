import React from 'react';
import { Box } from '@mui/material';

const Panel = ({ children}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        border: '2px solid #ccc',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(10, 10, 10, 1)',
      }}
    >
      {children}
    </Box>
  );
};

export default Panel;
