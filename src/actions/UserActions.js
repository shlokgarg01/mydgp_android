import {
  CLEAR_ERRORS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_VERIFY_FAIL,
  LOGIN_VERIFY_REQUEST,
  LOGIN_VERIFY_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  ON_DUTY_TOGGLE_FAIL,
  ON_DUTY_TOGGLE_REQUEST,
  ON_DUTY_TOGGLE_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_VERIFY_FAIL,
  REGISTER_VERIFY_REQUEST,
  REGISTER_VERIFY_SUCCESS,
  UPDATE_FCM_FAIL,
  UPDATE_FCM_REQUEST,
  UPDATE_FCM_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
} from '../constants/UserConstants';
import axiosInstance, {BASE_URL} from '../Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// send OTP FOR LOGIN
export const sendOTPLogin = contactNumber => async dispatch => {
  try {
    dispatch({type: LOGIN_REQUEST});

    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await axiosInstance.post(
      `${BASE_URL}/api/v1/login/otp/send`,
      {contactNumber},
      config,
    );

    dispatch({type: LOGIN_SUCCESS, payload: data.user});
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

// Verify OTP & Login
export const loginViaOTP = contactNumber => async dispatch => {
  try {
    dispatch({type: LOGIN_VERIFY_REQUEST});

    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await axiosInstance.post(
      `${BASE_URL}/api/v1/login/otp/verify`,
      {contactNumber},
      config,
    );
    await AsyncStorage.setItem('token', JSON.stringify(data.token));

    dispatch({type: LOGIN_VERIFY_SUCCESS, payload: data.user});
  } catch (error) {
    dispatch({
      type: LOGIN_VERIFY_FAIL,
      payload: error.response.data.message,
    });
  }
};

// send OTP FOR Registration
export const sendOTPRegistration = contactNumber => async dispatch => {
  try {
    dispatch({type: REGISTER_REQUEST});

    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await axiosInstance.post(
      `${BASE_URL}/api/v1/register/otp/send`,
      {contactNumber},
      config,
    );

    dispatch({type: REGISTER_SUCCESS, payload: data.user});
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Enter details for registration via OTP
export const EnterDetailsOPTPRegistration =
  registrationData => async dispatch => {
    try {
      dispatch({type: REGISTER_VERIFY_REQUEST});

      const config = {headers: {'Content-Type': 'application/json'}};
      const {data} = await axiosInstance.post(
        `${BASE_URL}/api/v1/register/otp`,
        registrationData,
        config,
      );
      await AsyncStorage.setItem('token', JSON.stringify(data.token));

      dispatch({type: REGISTER_VERIFY_SUCCESS, payload: data.user});
    } catch (error) {
      dispatch({
        type: REGISTER_VERIFY_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// load existing user
export const loadUser = () => async dispatch => {
  try {
    dispatch({type: LOAD_USER_REQUEST});
    const {data} = await axiosInstance.get(`${BASE_URL}/api/v1/me`, {});

    dispatch({type: LOAD_USER_SUCCESS, payload: data.user});
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

// logout user
export const logout = () => async dispatch => {
  try {
    await axiosInstance.get(`${BASE_URL}/api/v1/logout`);
    await AsyncStorage.clear();
    dispatch({type: LOGOUT_SUCCESS});
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

// Update User Details
export const updateUserDetails = userData => async dispatch => {
  try {
    dispatch({type: UPDATE_PROFILE_REQUEST});

    const config = {'Content-Type': 'application/json'};
    const {data} = await axiosInstance.put(
      `${BASE_URL}/api/v1/me/update`,
      userData,
      config,
    );

    dispatch({type: UPDATE_PROFILE_SUCCESS, payload: data.success});
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// toggle on-duty status
export const toggleDutyStatus = status => async dispatch => {
  try {
    dispatch({type: ON_DUTY_TOGGLE_REQUEST});

    const config = {'Content-Type': 'application/json'};
    const {data} = await axiosInstance.put(
      `${BASE_URL}/api/v1/me/update_status`,
      {status},
      config,
    );

    dispatch({type: ON_DUTY_TOGGLE_SUCCESS, payload: data.success});
  } catch (error) {
    dispatch({
      type: ON_DUTY_TOGGLE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// update FCM Token
export const updateFCM = fcm_token => async dispatch => {
  try {
    dispatch({type: UPDATE_FCM_REQUEST});
    const config = {'Content-Type': 'application/json'};
    const {data} = await axiosInstance.put(
      `${BASE_URL}/api/v1/me/update_fcm`,
      {fcm_token},
      config,
    );

    dispatch({type: UPDATE_FCM_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: UPDATE_FCM_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Used to clear all the errors
export const clearErrors = () => async dispatch => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
