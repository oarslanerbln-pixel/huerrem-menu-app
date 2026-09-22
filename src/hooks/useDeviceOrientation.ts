import { useState, useEffect } from 'react';

interface Orientation {
  alpha: number | null; // z-axis rotation (0-360)
  beta: number | null;  // x-axis rotation (-180 to 180) - front-to-back tilt
  gamma: number | null; // y-axis rotation (-90 to 90) - left-to-right tilt
}

export function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<Orientation>({
    alpha: null,
    beta: null,
    gamma: null,
  });

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
      });
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return orientation;
}
