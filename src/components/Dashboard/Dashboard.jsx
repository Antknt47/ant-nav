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

  const getDirectionLetter = (angle) => {
    if (angle >= 337.5 || angle < 22.5) return 'N';
    if (angle >= 22.5 && angle < 67.5) return 'NE';
    if (angle >= 67.5 && angle < 112.5) return 'E';
    if (angle >= 112.5 && angle < 157.5) return 'SE';
    if (angle >= 157.5 && angle < 202.5) return 'S';
    if (angle >= 202.5 && angle < 247.5) return 'SW';
    if (angle >= 247.5 && angle < 292.5) return 'W';
    if (angle >= 292.5 && angle < 337.5) return 'NW';
    return '';
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
              <Typography>{(orientation.alpha ?? 0).toFixed(1)} ° {getDirectionLetter(orientation.alpha ?? 0)}</Typography>
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
