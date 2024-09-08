import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showToast } from '../../helpers/ShowToast';
import RouteNames from '../../routes/RouteNames';
import { clearErrors, loginViaOTP, sendOTPLogin } from '../../actions/UserActions';
import AuthHeader from '../../components/Auth/AuthHeader';
import AuthStyles from '../../styles/AuthStyles';
import InputGroup from '../../components/InputGroup';
import Btn from '../../components/Btn';
import ButtonSubText from '../../components/Auth/ButtonSubText';
import auth from '@react-native-firebase/auth';
import Loader from '../../components/Loader';

export default function Login({ navigation, route }) {
  const [otp, setOtp] = useState();
  const [confirmation, setConfirmation] = useState(route.params.confirmation);
  const [otpLoading, setOtpLoading] = useState(false);

  const contactNumber = route.params.contactNumber;
  const dispatch = useDispatch();
  const { error, isAuthenticated, loading } = useSelector(state => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      showToast('success', 'Login Successful');
      navigation.reset({ index: 1, routes: [{ name: RouteNames.DRAWERS.HOME }] });
    }

    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, isAuthenticated]);

  const loginHandler = async () => {
    // try {
    //   await confirmation.confirm(otp);
    //   dispatch(loginViaOTP(contactNumber));
    // } catch (error) {
    //   showToast('error', 'Invalid OTP');
    // }
    if (otp == route.params.otp) {
      dispatch(loginViaOTP(contactNumber));
    } else {
      showToast('error', 'Invalid OTP');
    }
  };

  const resendOTP = async () => {
    // setOtpLoading(true);
    // const confirmation = await auth().signInWithPhoneNumber(
    //   `+91${contactNumber}`,
    // );
    // setConfirmation(confirmation);
    // setOtpLoading(false);
    // showToast('success', 'OTP Sent');
    callWhatsappOtpApi(contactNumber);
  };

  //sends whatsapp message for otp.
  const callWhatsappOtpApi = async contactNumber => {
    try {
      const otp = route.params.otp;
      const apiUrl =
        'https://graph.facebook.com/v19.0/414633705063465/messages';
      const accessToken =
        'EAAaO7W1PA5ABO1sjb0y9IkZBk1nfxhNH2H2sxkF8ps9AHHAWOj96MODmLPYjbFrov0ht8fsJZAjSdNgZC765dwZCKZAgWvNZBICeNVFviO7GEE1ZAvJWDaKajQeGDBjoWFUc5iAdrNQhEeWhQTyO19sefTShOfPitB4rACuzKnmpLVHZBM64uJ7Cv4YFHPI3uzU06wZDZD'; // Your access token

      const requestBody = {
        messaging_product: 'whatsapp',
        to: `91${contactNumber}`,
        type: 'template',
        template: {
          name: 'authpin',
          language: {
            code: 'en',
          },
          components: [
            {
              type: 'body',
              parameters: [
                {
                  type: 'text',
                  text: otp,
                },
              ],
            },
            {
              type: 'button',
              sub_type: 'url',
              index: 0,
              parameters: [
                {
                  type: 'text',
                  text: otp,
                },
              ],
            },
          ],
        },
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      //success
      console.log('API Response:', responseData);
      showToast('success', 'Otp Sent');
      // Handle response data as needed
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
  };

  return otpLoading || loading ? (
    <Loader />
  ) : (
    <View>
      <AuthHeader />
      <View style={AuthStyles.formContainer}>
        <Text style={AuthStyles.heading}>ENTER OTP</Text>
        <InputGroup
          label="Enter OTP"
          placeholder="xxxx"
          value={otp}
          maxLength={4}
          style={AuthStyles.inputField}
          onChange={otpEntered => setOtp(otpEntered)}
          type="number-pad"
        />
        <Btn onClick={loginHandler} label="LOGIN" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <ButtonSubText subTitle="Entered Wrong No?" subTitleOnClick={() => {
            navigation.pop();
          }} />
          <ButtonSubText subTitle="Resend OTP" subTitleOnClick={resendOTP} />
        </View>
      </View>
    </View>
  );
}
