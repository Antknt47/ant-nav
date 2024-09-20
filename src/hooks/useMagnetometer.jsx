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
      // 检查设备是否支持 Magnetometer API
      if ('Magnetometer' in window) {
        alert("支持磁力计");
        setSupported(true);
        
        const magnetometer = new Magnetometer();

        const handleReading = () => {
          const { x, y, z } = magnetometer;

          // 计算方位角
          const azimuth = Math.atan2(y, x) * (180 / Math.PI);

          setData({
            x,
            y,
            z,
            azimuth: azimuth >= 0 ? azimuth : azimuth + 360 // 确保方位角为正值
          });
        };

        const handleError = (event) => {
          setError(event.error.message);
        };

        magnetometer.addEventListener('reading', handleReading);
        magnetometer.addEventListener('error', handleError);

        // 启动 Magnetometer
        magnetometer.start();

        // 清理工作
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
