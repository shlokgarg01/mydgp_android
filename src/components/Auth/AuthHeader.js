import { View, Text, Image } from 'react-native';
import React from 'react';
import Logo from '../../images/logo_blue.png'
import AuthComponentStyles from '../../styles/AuthComponentStyles';

export default function AuthHeader() {
  return (
    <View style={AuthComponentStyles.bgContainer}>
      <Image source={Logo} style={AuthComponentStyles.logo} />
    </View>
  );
}
