import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

// Modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'black'
};

const PermissionModal = ({ open, onRequestPermission, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Request Device Orientation Permission
        </Typography>
        <Typography sx={{ mt: 2 }}>
          We need your permission to access device orientation data.
        </Typography>
        <Button variant="contained" color="primary" onClick={onRequestPermission} sx={{ mt: 2 }}>
          OK
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose} sx={{ mt: 2, ml: 2 }}>
          CLOSE
        </Button>
      </Box>
    </Modal>
  );
};

export default PermissionModal;
