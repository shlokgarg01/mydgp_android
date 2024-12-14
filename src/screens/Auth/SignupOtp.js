import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import RouteNames from '../../routes/RouteNames';
import {showToast} from '../../helpers/ShowToast';
import {clearErrors, sendOTPRegistration} from '../../actions/UserActions';
import Loader from '../../components/Loader';
import AuthHeader from '../../components/Auth/AuthHeader';
import AuthStyles from '../../styles/AuthStyles';
import InputGroup from '../../components/InputGroup';
import Btn from '../../components/Btn';
import ButtonSubText from '../../components/Auth/ButtonSubText';
import auth from '@react-native-firebase/auth';

export default function SignupOtp({navigation}) {
  const [contactNumber, setContactNumber] = useState();
  const [otpLoading, setOtpLoading] = useState(false);
  
  const dispatch = useDispatch();
  const {error, isAuthenticated, loading, canSendOtp} = useSelector(
    state => state.user,
  );

  // const sendOtp = async () => {
  //   setOtpLoading(true);
  //   const confirmation = await auth().signInWithPhoneNumber(
  //     `+91${contactNumber}`,
  //   );
  //   setOtpLoading(false);
  //   showToast('success', 'OTP Sent');
  //   navigation.navigate(RouteNames.AUTH.SIGNUPOTPVERIFY, {
  //     contactNumber,
  //     confirmation,
  //   });
  // };

  // Function to generate a 4-digit OTP
  const generateOTP = async () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  //sends whatsapp message for otp.
  const callWhatsappOtpApi = async contactNumber => {
    try {
      const otp = await generateOTP(); // Wait for OTP generation
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
      navigation.navigate(RouteNames.AUTH.SIGNUPOTPVERIFY, {
        contactNumber,
        otp,
      });

      // Handle response data as needed
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
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
      // sendOtp();
      callWhatsappOtpApi(contactNumber);
    }
  }, [dispatch, error, isAuthenticated, canSendOtp]);

  const formSubmitHandler = () => {
    dispatch(sendOTPRegistration(contactNumber));
  };

  return (
    <>
      {loading || otpLoading ? (
        <Loader />
      ) : (
        <View>
          <AuthHeader />
          <View style={AuthStyles.formContainer}>
            <Text style={AuthStyles.heading}>REGISTER</Text>
            <InputGroup
              label="Whatsapp Number"
              placeholder="9999999999"
              value={contactNumber}
              maxLength={10}
              style={AuthStyles.inputField}
              onChange={number => setContactNumber(number)}
              type="number-pad"
            />
            <Btn onClick={formSubmitHandler} label="Send OTP" />
            <ButtonSubText
              title="Already have an account?"
              subTitle="Login"
              subTitleOnClick={() =>
                navigation.replace(RouteNames.AUTH.LOGINOTP)
              }
            />
          </View>
        </View>
      )}
    </>
  );
}
