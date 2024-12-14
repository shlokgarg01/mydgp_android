import React, {useEffect, useState} from 'react';
import store from '../../store';
import {useSelector} from 'react-redux';
import {Image, Text, View} from 'react-native';
import RouteNames from '../routes/RouteNames';
import {loadUser} from '../actions/UserActions';

const Splash = ({navigation}) => {
  const {isAuthenticated} = useSelector(state => state.user);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const initializeApp = async () => {      
      // Wait for loadUser to complete
      await store.dispatch(loadUser());
      
      // Get the latest auth state from Redux store
      const currentState = store.getState();
      const isUserAuthenticated = currentState.user.isAuthenticated;
      
      // Navigate based on the current auth state
      const routeName = isUserAuthenticated 
        ? RouteNames.DRAWERS.HOME 
        : RouteNames.AUTH.LOGINOTP;
        
      navigation.replace(routeName);
    };
    initializeApp();

  }, [navigation]);
  
  useEffect(() => {
    // Dot animation logic
    const dotInterval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots.length < 3) {
          return prevDots + '.';
        }
        return '';
      });
    }, 500);

    return () => clearInterval(dotInterval);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../images/logo_capt.png')}
        style={{
          height: 130,
          width: 130,
          borderRadius: 1000,
        }}
      />
      <Text style={{ fontSize: 16, width: 150 ,marginTop:50}} >
        Fetching location{dots}
      </Text>
    </View>
  );
};

export default Splash;