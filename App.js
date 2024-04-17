import React, {useEffect} from 'react';
import Routes from './src/routes/Routes';
import {Provider} from 'react-redux';
import Toast, {SuccessToast, ErrorToast} from 'react-native-toast-message';
import store from './store';
import messaging from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

const toastConfig = {
  success: props => (
    <SuccessToast
      {...props}
      text1Style={{
        fontSize: 14,
      }}
      text1NumberOfLines={4}
      text2NumberOfLines={4}
    />
  ),
  error: props => (
    <ErrorToast {...props} text1NumberOfLines={4} text2NumberOfLines={4} text1Style={{
      fontSize: 15,
    }} />
  ),
};

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        'Booking Alert !',
        JSON.stringify(remoteMessage.notification.title),
      );
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <Routes />
      <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;
