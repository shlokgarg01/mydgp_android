import {View, Text, Image, PermissionsAndroid} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {deviceHeight, deviceWidth} from '../helpers/Dimensions';
import ToggleSwitch from '../components/ToggleSwitch';
import {useDispatch, useSelector} from 'react-redux';
import Enums from '../helpers/Enums';
import {toggleDutyStatus, updateFCM} from '../actions/UserActions';
import BookingRequests from './BookingRequests';
import CompleteProfileModal from '../components/CompleteProfileModal/CompleteProfileModal';
import Logo from '../images/logo_capt.png';
import getNewFCMToken from '../../getFCMTToken';
import ImageCarousel from '../components/ImageCarousel';
import {BackHandler} from 'react-native';
import RouteNames from '../routes/RouteNames';
import Btn from '../components/Btn';
import Colors from '../helpers/Colors';
import {
  GET_CURRENT_BOOKINGS_FAIL,
  GET_CURRENT_BOOKINGS_REQUEST,
  GET_CURRENT_BOOKINGS_SUCCESS,
} from '../constants/BookingsConstants';
import axiosInstance, {BASE_URL} from '../Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ForceUpdate from '../components/ForceUpdate';

export default function Home() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const [onDuty, setOnDuty] = useState(
    user?.status === Enums.SERVICE_PROVIDER_STATUS.ACTIVE ? true : false,
  );
  const {currentBookings} = useSelector(state => state.currentBookings);
  const [isDutySwitchVisible, setDutySwitchVisible] = useState(true);

  // const [isProfilePending, setProfilePending] = useState(user.isProfileUpdated);

  const images = [
    'https://firebasestorage.googleapis.com/v0/b/my-dpg.appspot.com/o/riderBanner1.jpg?alt=media',
    'https://firebasestorage.googleapis.com/v0/b/my-dpg.appspot.com/o/riderBanner2.jpg?alt=media',
  ];

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

  useEffect(() => {
    dispatch(getCurrentBookings());
  }, []);

  // switch off duty when there are accepted bookings to prevent notifications
  useEffect(() => {
    if (currentBookings?.length > 0) {
      setOnDuty(false);
      dispatch(toggleDutyStatus(Enums.SERVICE_PROVIDER_STATUS.INACTIVE));
      setDutySwitchVisible(false); //hide switch and change text
      AsyncStorage.setItem(
        'lastDutyStatus',
        Enums.SERVICE_PROVIDER_STATUS.ACTIVE,
      );
      return;
    }
    setDutySwitchVisible(true);
  }, [currentBookings]);

  //returns on duty automatically after completing the booking.
  useEffect(() => {
    const getLastDutyStatus = async () => {
      try {
        const storedValue = await AsyncStorage.getItem('lastDutyStatus');
        if (storedValue !== null && !onDuty && currentBookings?.length < 1) {
          setOnDuty(true);
          dispatch(toggleDutyStatus(Enums.SERVICE_PROVIDER_STATUS.ACTIVE));
          AsyncStorage.removeItem('lastDutyStatus');
        }
      } catch (error) {
        console.error('Error getting value from AsyncStorage', error);
      }
    };
    getLastDutyStatus();
  }, [currentBookings]);

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'MYDGP Team',
          message: 'MYDGP Team access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  // get all current bookings
  const getCurrentBookings = () => async dispatch => {
    try {
      dispatch({type: GET_CURRENT_BOOKINGS_REQUEST});
      const {data} = await axiosInstance.get(
        `${BASE_URL}/api/v1/bookings/current`,
      );

      dispatch({type: GET_CURRENT_BOOKINGS_SUCCESS, payload: data.bookings});
    } catch (error) {
      dispatch({
        type: GET_CURRENT_BOOKINGS_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //returns to home from all screen on back press
  const handleBackPress = () => {
    navigation.navigate(RouteNames.CURRENT_BOOKINGS);
    return true;
  };

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () =>
        isDutySwitchVisible && (
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
  }, [navigation, onDuty, isDutySwitchVisible]);

  useEffect(() => {
    const update_fcm = async () => {
      let token = await getNewFCMToken();
      dispatch(updateFCM(token));
    };
    update_fcm();
  }, []);

  useEffect(() => {
    const reqLoc = async () => {
      await requestLocationPermission();
    };
    setTimeout(() => {
      reqLoc();
    }, 100);
  }, []);

  return <View>
  {onDuty ? (
    <>
      {!user?.isProfileUpdated && <CompleteProfileModal />}
      <ImageCarousel images={images} />
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
      <Image source={Logo} style={{width: 150, height: 150}} />
      <>
        <Text style={{fontSize: 28, fontWeight: 'bold', marginTop: 40}}>
          {isDutySwitchVisible ? 'Welcome!' : 'Booking Already in queue!'}
        </Text>
        <Text
          style={{
            fontSize: 16,
            paddingHorizontal: 40,
            textAlign: 'center',
            marginTop: 10,
          }}>
          {isDutySwitchVisible
            ? 'Thanks for joining! Go on-duty and get start earning!'
            : 'Complete that to get new bookings'}
        </Text>
        {!isDutySwitchVisible && (
          <Btn
            label={'Show my booking'}
            style={{paddingHorizontal: 20}}
            onClick={() => {
              navigation.navigate(RouteNames.TODAY_BOOKINGS);
            }}
            bgColor={Colors.THEME_COLOR}
          />
        )}
      </>
      {!user?.isProfileUpdated && <CompleteProfileModal />}
    </View>
  )}
  <ForceUpdate/>
  </View>
}
