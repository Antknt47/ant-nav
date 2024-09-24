import { useState, useEffect, useRef, useMemo } from 'react';

const useGeolocation = (options = {
  enableHighAccuracy: true,
  timeout: 3000,
  maximumAge: 0
}) => {
  const [geo, setGeo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const watchId = useRef(null); 

  const memoizedOptions = useMemo(() => options, [options.enableHighAccuracy, options.timeout, options.maximumAge]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
      return;
    }

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

    watchId.current = navigator.geolocation.watchPosition(handleSuccess, handleError, memoizedOptions);

    return () => {
      if (watchId.current !== null) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, [memoizedOptions]);
  return { geo, error, loading };
};

export default useGeolocation;
