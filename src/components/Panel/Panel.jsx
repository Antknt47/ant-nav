import React from 'react';
import { Box } from '@mui/material';

const Panel = ({ children}) => {
  return (
    <Box
      sx={{
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
        border: '2px solid #ccc',
        backgroundColor: 'rgba(10, 10, 10, 1)',
        aspectRatio: 1,
        overflow: 'hidden',
      }}
    >
      {children}
    </Box>
  );
};

export default Panel;
