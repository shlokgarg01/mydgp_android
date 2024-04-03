import { View, Image } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import { deviceHeight, deviceWidth } from '../helpers/Dimensions';
import ToggleSwitch from '../components/ToggleSwitch';
import { useDispatch, useSelector } from 'react-redux';
import Enums from '../helpers/Enums';
import { toggleDutyStatus } from '../actions/UserActions';
import BookingRequests from './BookingRequests';
import Video from 'react-native-video';
import CompleteProfileModal from '../components/CompleteProfileModal/CompleteProfileModal';
import Logo from '../images/logo_blue.png';

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [onDuty, setOnDuty] = useState(
    user?.status === Enums.SERVICE_PROVIDER_STATUS.ACTIVE ? true : false,
  );
  const [isProfilePending, setProfilePending] = useState(false);

  const updateDutyStatus = () => {
    setOnDuty(!onDuty);
    dispatch(
      toggleDutyStatus(
        onDuty
          ? Enums.SERVICE_PROVIDER_STATUS.INACTIVE
          : Enums.SERVICE_PROVIDER_STATUS.ACTIVE,
      ),
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 20,
          }}>
          <ToggleSwitch
            title={onDuty ? 'ON DUTY' : 'OFF DUTY'}
            value={onDuty}
            onValueChange={updateDutyStatus}
          />
        </View>
      ),
    });
  }, [navigation, onDuty]);

  return onDuty ? (
    <>
      {isProfilePending && <CompleteProfileModal />}
      <BookingRequests />
    </>
  ) : (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: deviceHeight,
        width: deviceWidth,
      }}>
      {/* <Video
        source={require('../utils/on-duty.mp4')}
        style={{ width: 220, height: 130 }}
        repeat={true}
      /> */}
      <Image source={Logo} style={{ width: 150, height: 150 }} />
      <>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginTop: 40 }}>
          Welcome!
        </Text>
        <Text
          style={{ fontSize: 16, paddingHorizontal: 40, textAlign: 'center', marginTop: 10 }}>
          Thanks for joining! Go on-duty and get started on your journey!
        </Text>
      </>
      {isProfilePending && <CompleteProfileModal />}
    </View>
  );
}
