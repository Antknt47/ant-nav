import { useState, useEffect } from 'react';

const useGeolocation = (options = {
   enableHighAccuracy: true,
   timeout: 3000,
   maximumAge: 0

  }) => {
  const [geo, setGeo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [watchId, setWatchId] = useState(null);

  useEffect(() => {
    const handleSuccess = (position) => {
      setGeo({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        altitude: position.coords.altitude,
        speed: position.coords.speed,
        heading: position.coords.heading,
      });
      setLoading(false);
    };

    const handleError = (error) => {
      setError(error.message);
      setLoading(false);
    };

    if (navigator.geolocation) {
      const geo = navigator.geolocation;
      const id = geo.watchPosition(handleSuccess, handleError, options);
      setWatchId(id);
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }

    return () => {
      if (navigator.geolocation && watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId, options]);

  return { geo, error, loading };
};

export default useGeolocation;
