import { useState, useEffect } from 'react';

const useAccelerometer = () => {
  const [acceleration, setAcceleration] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [gForce, setGForce] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleMotion = (event) => {
      if (event.acceleration) {
        const { x, y, z } = event.acceleration;
        const accX = x ?? 0;
        const accY = y ?? 0;
        const accZ = z ?? 0;

        setAcceleration({ x: accX, y: accY, z: accZ });

        // Calculate G-force
        const accelerationMagnitude = Math.sqrt(accX ** 2 + accY ** 2 + accZ ** 2);
        const gForceValue = accelerationMagnitude / 9.81;
        setGForce(gForceValue);
      }
    };

    const handleError = () => {
      setError('Accelerometer is not supported by your device.');
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion, true);
    } else {
      handleError();
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, []);

  return { acceleration, gForce, error };
};

export default useAccelerometer;
