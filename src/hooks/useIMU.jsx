import { useState, useEffect } from 'react';

const useIMU = () => {
  const [ orientation, setOrientation ] = useState({pitch: 0, roll: 0, yaw: 0});
  const [ permissionGranted, setPermissionGranted ] = useState(false);

  const requestPermission = async () => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          window.addEventListener('deviceorientation', handleOrientation);
          setPermissionGranted(true);
        } else {
          alert('Permission denied');
        }
      } catch (error) {
        alert('Error requesting device orientation permission:' + error);
      }
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
      setPermissionGranted(true);
    }
  };


  const handleOrientation = (event) => {
    const rlt = {
      pitch: event.gamma, // x corresponds to pitch
      roll: event.beta,   // y corresponds to roll
      yaw: event.webkitCompassHeading // ios, webkitCompassHeading to yaw
    }
    setOrientation(rlt);   
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [permissionGranted]);

  return { orientation, requestPermission, permissionGranted };
};

export default useIMU;
