import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AuthStyles from '../../styles/AuthStyles';
import AuthHeader from '../../components/Auth/AuthHeader';
import ButtonSubText from '../../components/Auth/ButtonSubText';
import Btn from '../../components/Btn';
import InputGroup from '../../components/InputGroup';
import Loader from '../../components/Loader';
import RouteNames from '../../routes/RouteNames';
import {showToast} from '../../helpers/ShowToast';
import {clearErrors, sendOTPLogin} from '../../actions/UserActions';
import auth from '@react-native-firebase/auth';

export default function LoginOtp({navigation}) {
  const [contactNumber, setContactNumber] = useState();
  const [otpLoading, setOtpLoading] = useState(false);

  const dispatch = useDispatch();
  const {error, isAuthenticated, loading, canSendOtp} = useSelector(
    state => state.user,
  );

  const formSubmitHandler = async () => {
    dispatch(sendOTPLogin(contactNumber));
  };

  const sendOtp = async () => {
    setOtpLoading(true);
    const confirmation = await auth().signInWithPhoneNumber(
      `+91${contactNumber}`,
    );
    setOtpLoading(false);
    showToast('success', 'OTP Sent');
    navigation.navigate(RouteNames.AUTH.LOGIN, {contactNumber, confirmation});
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({index: 1, routes: [{name: RouteNames.DRAWERS.HOME}]});
    }

    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }

    if (canSendOtp) {
      sendOtp();
    }
  }, [dispatch, error, isAuthenticated, canSendOtp, contactNumber]);

  return (
    <>
      {loading || otpLoading ? (
        <Loader />
      ) : (
        <View>
          <AuthHeader />
          <View style={AuthStyles.formContainer}>
            <Text style={AuthStyles.heading}>LOGIN</Text>
            <InputGroup
              label="Contact Number"
              placeholder="9999999999"
              value={contactNumber}
              style={AuthStyles.inputField}
              onChange={number => setContactNumber(number)}
              type="number-pad"
            />
            <Btn onClick={formSubmitHandler} label="Send OTP" />
            <ButtonSubText
              title="Don't have an account?"
              subTitle="Register"
              subTitleOnClick={() =>
                navigation.replace(RouteNames.AUTH.SIGNUPOTP)
              }
            />
          </View>
        </View>
      )}
    </>
  );
}
