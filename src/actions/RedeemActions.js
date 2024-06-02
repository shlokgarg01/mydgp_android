import axiosInstance, {BASE_URL} from '../Axios';
import {
  CLEAR_ERRORS,
  REDEEM_DETAILS_FAIL,
  REDEEM_DETAILS_REQUEST,
  REDEEM_DETAILS_SUCCESS,
  REDEEM_FAIL,
  REDEEM_REQUEST,
  REDEEM_SUCCESS,
} from '../constants/RedeemConstants';

// get all redeem details
export const getRedeemDetails = () => async dispatch => {
  try {
    dispatch({type: REDEEM_DETAILS_REQUEST});
    const {data} = await axiosInstance.get(`${BASE_URL}/api/v1/redeem`);

    dispatch({type: REDEEM_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: REDEEM_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// request for Redeem Coins
export const requestRedeemCoins = amount => async dispatch => {
  try {
    dispatch({type: REDEEM_REQUEST});

    const config = {'Content-Type': 'application/json'};
    const {data} = await axiosInstance.post(
      `${BASE_URL}/api/v1/redeemRequests/new`,
      {amount},
      config,
    );

    dispatch({type: REDEEM_SUCCESS, payload: data.redeemRequest});
  } catch (error) {
    dispatch({
      type: REDEEM_FAIL,
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
