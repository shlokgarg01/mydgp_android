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
    // try {
    //   await confirmation.confirm(otp);
    //   navigation.replace(RouteNames.AUTH.SIGNUP, {contactNumber});
    // } catch (error) {
    //   showToast('error', 'Invalid OTP.');
    // }
    if (otp == route.params.otp) {
      navigation.replace(RouteNames.AUTH.SIGNUP, {contactNumber});
    } else {
      showToast('error', 'Invalid OTP');
    }
  };

  const resendOTP = () => {
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
        'https://graph.facebook.com/v19.0/365577786631719/messages';
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

  return otpLoading ? (
    <Loader />
  ) : (
    <View>
      <AuthHeader />
      <View style={AuthStyles.formContainer}>
        <Text style={AuthStyles.heading}>ENTER OTP</Text>
        <InputGroup
          label="Enter OTP"
          placeholder="xxxx"
          maxLength={4}
          style={AuthStyles.inputField}
          value={otp}
          onChange={otpEntered => setOtp(otpEntered)}
          type="number-pad"
        />
        <Btn onClick={verifyOTPHandler} label="VERIFY" />
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <ButtonSubText subTitle="Entered Wrong No?" subTitleOnClick={()=>{navigation.pop()}} />
        <ButtonSubText subTitle="Resend OTP" subTitleOnClick={resendOTP} />
        </View>
      </View>
    </View>
  );
}
 