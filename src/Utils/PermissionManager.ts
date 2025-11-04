import { Platform } from 'react-native';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const permission = Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    const result = await request(permission);
    return result === RESULTS.GRANTED;
  } catch (err) {
    console.warn('Permission request failed:', err);
    return false;
  }
};

export const checkLocationPermission = async (): Promise<boolean> => {
  try {
    const permission = Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

    const result = await check(permission);
    return result === RESULTS.GRANTED;
  } catch (err) {
    console.warn('Permission check failed:', err);
    return false;
  }
};

export const checkLocationServicesEnabled = (): Promise<boolean> => {
  return new Promise((resolve) => {
    Geolocation.getCurrentPosition(
      () => resolve(true),
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          resolve(false);
        } else {
          resolve(true);
        }
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 }
    );
  });
};

export const getCurrentLocation = (): Promise<{ latitude: number; longitude: number; altitude?: number | null; accuracy: number; altitudeAccuracy?: number | null; heading?: number | null; speed?: number | null; latitudeDelta: number; longitudeDelta: number }> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed } = position.coords;
        resolve({ latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed, latitudeDelta: 0.0922, longitudeDelta: 0.0421 });
      },
      (error) => {
        let errorMessage = 'Unknown location error';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable. Please check if location services are enabled.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please ensure you have a clear view of the sky or try again.';
            break;
          default:
            errorMessage = error.message || 'Failed to get location';
            break;
        }
        console.warn('Error getting location:', errorMessage, error);
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: false, 
        timeout: 30000, 
        maximumAge: 60000, 
      }
    );
  });
};
