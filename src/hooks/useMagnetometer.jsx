import { useState, useEffect } from 'react';

const useMagnetometer = () => {
  const [data, setData] = useState({
    x: null,
    y: null,
    z: null,
    azimuth: null
  });
  const [error, setError] = useState(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    navigator.permissions.query({ name: "magnetometer" }).then((result) => {
      if ('Magnetometer' in window) {
        alert("支持磁力计");
        setSupported(true);
        
        const magnetometer = new Magnetometer();

        const handleReading = () => {
          const { x, y, z } = magnetometer;

          const azimuth = Math.atan2(y, x) * (180 / Math.PI);

          setData({
            x,
            y,
            z,
            azimuth: azimuth >= 0 ? azimuth : azimuth + 360
          });
        };

        const handleError = (event) => {
          setError(event.error.message);
        };

        magnetometer.addEventListener('reading', handleReading);
        magnetometer.addEventListener('error', handleError);

        magnetometer.start();

        return () => {
          magnetometer.stop();
          magnetometer.removeEventListener('reading', handleReading);
          magnetometer.removeEventListener('error', handleError);
        };
      } else {
        setSupported(false);
        setError('Magnetometer API not supported');
      }
    }).catch((e)=>{
      alert(e);
    })
    
  }, []);

  return { data, error, supported };
};

export default useMagnetometer;
