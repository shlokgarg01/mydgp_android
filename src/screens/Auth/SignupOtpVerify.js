import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {showToast} from '../../helpers/ShowToast';
import RouteNames from '../../routes/RouteNames';
import {clearErrors} from '../../actions/UserActions';
import AuthHeader from '../../components/Auth/AuthHeader';
import AuthStyles from '../../styles/AuthStyles';
import InputGroup from '../../components/InputGroup';
import Btn from '../../components/Btn';
import ButtonSubText from '../../components/Auth/ButtonSubText';
import auth from '@react-native-firebase/auth';
import Loader from '../../components/Loader';

export default function SignupOtpVerify({navigation, route}) {
  const [confirmation, setConfirmation] = useState(route.params.confirmation);
  const [otp, setOtp] = useState();
  const [otpLoading, setOtpLoading] = useState(false);
  const contactNumber = route.params.contactNumber;

  const dispatch = useDispatch();
  const {error, isAuthenticated} = useSelector(state => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      showToast('success', 'OTP Verified');
      navigation.reset({index: 1, routes: [{name: RouteNames.DRAWERS.HOME}]});
    }

    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated]);

  const verifyOTPHandler = async () => {
    try {
      await confirmation.confirm(otp);
      navigation.replace(RouteNames.AUTH.SIGNUP, {contactNumber});
    } catch (error) {
      showToast('error', 'Invalid OTP.');
    }
  };

  const resendOTP = async () => {
    setOtpLoading(true);
    const confirmation = await auth().signInWithPhoneNumber(
      `+91${contactNumber}`,
    );
    setConfirmation(confirmation);
    setOtpLoading(false);
    showToast('success', 'OTP Sent');
  };

  return otpLoading ? (
    <Loader />
  ) : (
    <View>
      <AuthHeader />
      <View style={AuthStyles.formContainer}>
        <Text style={AuthStyles.heading}>ENTER OTP</Text>
        <InputGroup
          label="Enter OTP"
          placeholder="xxxxxx"
          style={AuthStyles.inputField}
          value={otp}
          onChange={otpEntered => setOtp(otpEntered)}
          type="number-pad"
        />
        <Btn onClick={verifyOTPHandler} label="VERIFY" />
        <ButtonSubText subTitle="Resend OTP" subTitleOnClick={resendOTP} />
      </View>
    </View>
  );
}
