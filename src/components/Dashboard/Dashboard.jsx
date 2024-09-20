import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid2 } from '@mui/material';

import useDeviceOrientation from '../../hooks/useDeviceOrientation';

import PermissionModal from '../PermissionModal';
import Compass from '../Compass';
import Panel from '../Panel';

const Dashboard = () => {
  const { orientation, requestPermission, permissionGranted } = useDeviceOrientation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!permissionGranted) {
      setIsModalOpen(true);
    }
  }, [permissionGranted]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Container
      disableGutters 
      sx={{
      height: '100vh',
      width: '100vw',
      padding: '1rem'
    }}>
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <Panel>
            <Container>
              <Compass rotation={orientation.alpha}/>
              <Typography>{(orientation.alpha ?? 0).toFixed(1)} °</Typography>
            </Container>
          </Panel>
        </Grid2>
        {/* <Grid2 size={6}>
          <Panel>
            <Container>
              <Compass rotation={orientation.alpha}/>
              <Typography>{(orientation.alpha ?? 0).toFixed(1)} °</Typography>
            </Container>
          </Panel>
        </Grid2> */}
      </Grid2>

      {!permissionGranted && (
        <PermissionModal
          open={isModalOpen}
          onRequestPermission={() => {
            requestPermission();
            handleCloseModal();
          }}
          onClose={handleCloseModal}
        />
      )}

    </Container>
  );
};

export default Dashboard;
