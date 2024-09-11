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
    store.dispatch(loadUser());
    let routeName = RouteNames.AUTH.LOGINOTP;

    if (isAuthenticated) {
      routeName = RouteNames.DRAWERS.HOME;
    } else {
      routeName = RouteNames.AUTH.LOGINOTP;
    }

    setTimeout(() => {
      navigation.replace(routeName);
    }, 2000);
  }, []);

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

    // Cleanup interval on unmount
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
          // flex: 1,
          // width: '100%',
          // height: '100%',
        }}
      />
      <Text style={{ fontSize: 16, width: 150 ,marginTop:50}} >Fetching location{dots}</Text>
    </View>
  );
};

export default Splash;
