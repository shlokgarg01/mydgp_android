import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';

let token;

const requestUserPermission = async () => {
  // for android api +33
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    token = (await messaging().getToken()).toString();
  } else {
    console.log('REQUEST PERMISSION DENIED');
  }
};

const getNewFCMToken = async () => {
  try {
    await requestUserPermission();
    return token;
  } catch (error) {
    console.error('Error getting new FCM token:', error);
  }
};

export default getNewFCMToken;
