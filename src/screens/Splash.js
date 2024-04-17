import React, { useEffect } from 'react';
import store from '../../store';
import { useSelector } from 'react-redux';
import { Image, View } from 'react-native';
import RouteNames from '../routes/RouteNames';
import { loadUser } from '../actions/UserActions';

const Splash = ({ navigation }) => {
  const { isAuthenticated } = useSelector(state => state.user);

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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../images/logo_blue.png')}
        style={{
          height: 130,
          width: 130,
          borderRadius: 1000
          // flex: 1,
          // width: '100%',
          // height: '100%',
        }}
      />
    </View>
  );
};

export default Splash;
