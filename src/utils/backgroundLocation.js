import BackgroundActions from 'react-native-background-actions';
import GetLocation from 'react-native-get-location';
import { BASE_URL } from '../Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const veryIntensiveTask = async taskData => {
  while (BackgroundActions.isRunning()) {
    // Perform your location-based task here
    console.log('Background task running...');
    const location = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    });

    const {latitude, longitude} = location;
    updateLastLocation(latitude, longitude)

    await new Promise(resolve => setTimeout(resolve, 1800000)); // Wait 30 minutes
  }
};

// Function to update the last location on db by calling api
async function updateLastLocation(lat,long) {
  const url = `${BASE_URL}/api/v1/me/updateLastLocation`
  let token = await AsyncStorage.getItem('token');
  token = token ? JSON.parse(token) : '';
  let contactNumber = await AsyncStorage.getItem('contactNumber');

  const data = {
      latitude: lat,
      longitude: long,
      contactNumber: contactNumber
  };

  try {
      const response = await fetch(url, {
          method: 'PATCH',
          headers: {
              'Authorization': token,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Location updated successfully:', result);
  } catch (error) {
      console.error('Error updating location:', error);
  }
}

const options = {
  taskName: 'LocationTracking',
  taskTitle: 'Tracking Location',
  taskDesc: 'This app is tracking your location in the background.',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff9900',
  linkingURI: 'myapp://home', // Optional, opens when notification is tapped
  parameters: {
    delay: 1000,
  },
};

export const startBackgroundTask = async () => {
  try {
    console.log('Starting background task...');
    await BackgroundActions.start(veryIntensiveTask, options);
  } catch (error) {
    console.error('Error starting background task:', error);
  }
};

export const stopBackgroundTask = async () => {
  try {
    await BackgroundActions.stop();
  } catch (error) {
    console.error('Error stopping background task:', error);
  }
};
