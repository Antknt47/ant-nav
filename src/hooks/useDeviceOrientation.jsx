import { useState, useEffect } from 'react';

const useDeviceOrientation = () => {
  const [orientation, setOrientation] = useState({ alpha: null, beta: null, gamma: null });
  const [permissionGranted, setPermissionGranted] = useState(false);

  const handleOrientation = (event) => {
    setOrientation({
      alpha: event.alpha,
      beta: event.beta,
      gamma: event.gamma,
      compassHeading: event.webkitCompassHeading,
    });
  };

    const requestPermission = async () => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
          setPermissionGranted(true);          } else {
          console.log('Permission denied');
        }
      } catch (error) {
        console.error('Error requesting device orientation permission:', error);
      }
    } else {
            window.addEventListener('deviceorientation', handleOrientation);
      setPermissionGranted(true);      }
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return { orientation, requestPermission, permissionGranted };
};

export default useDeviceOrientation;
