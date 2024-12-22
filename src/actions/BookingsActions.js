import axiosInstance, {BASE_URL} from '../Axios';
import {
  CANCEL_BOOKING_FAIL,
  CANCEL_BOOKING_REQUEST,
  CANCEL_BOOKING_SUCCESS,
  CLEAR_ERRORS,
  GET_COMPLETED_BOOKINGS_FAIL,
  GET_COMPLETED_BOOKINGS_REQUEST,
  GET_COMPLETED_BOOKINGS_SUCCESS,
  GET_CURRENT_BOOKINGS_FAIL,
  GET_CURRENT_BOOKINGS_REQUEST,
  GET_CURRENT_BOOKINGS_SUCCESS,
  GET_FUTURE_BOOKINGS_FAIL,
  GET_FUTURE_BOOKINGS_REQUEST,
  GET_FUTURE_BOOKINGS_SUCCESS,
  GET_PENDING_AMOUNT_FAIL,
  GET_PENDING_AMOUNT_REQUEST,
  GET_PENDING_AMOUNT_SUCCESS,
  UPDATE_BOOKING_STATUS_FAIL,
  UPDATE_BOOKING_STATUS_REQUEST,
  UPDATE_BOOKING_STATUS_SUCCESS,
} from '../constants/BookingsConstants';
import {  getDDMMYYDate } from '../utils/DateTime';
import { sendWhatsappBookingCancelToCustomer } from '../utils/whatsappMsgsUtils';

// get all completed bookings
export const getCompletedBookings = () => async dispatch => {
  try {
    dispatch({type: GET_COMPLETED_BOOKINGS_REQUEST});

    const {data} = await axiosInstance.get(
      `${BASE_URL}/api/v1/bookings/completed`,
    );

    dispatch({type: GET_COMPLETED_BOOKINGS_SUCCESS, payload: data.bookings});
  } catch (error) {
    dispatch({
      type: GET_COMPLETED_BOOKINGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get all future bookings
export const getFutureBookings = () => async dispatch => {
  try {
    dispatch({type: GET_FUTURE_BOOKINGS_REQUEST});
    const {data} = await axiosInstance.get(
      `${BASE_URL}/api/v1/bookings/future`,
    );

    dispatch({type: GET_FUTURE_BOOKINGS_SUCCESS, payload: data.bookings});
  } catch (error) {
    dispatch({
      type: GET_FUTURE_BOOKINGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get all current bookings
export const getCurrentBookings = () => async dispatch => {
  try {
    dispatch({type: GET_CURRENT_BOOKINGS_REQUEST});
    const {data} = await axiosInstance.get(
      `${BASE_URL}/api/v1/bookings/current`,
    );

    dispatch({type: GET_CURRENT_BOOKINGS_SUCCESS, payload: data.bookings});
  } catch (error) {
    dispatch({
      type: GET_CURRENT_BOOKINGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get all current bookings
export const updateBookingStatus =
  (bookingId, status, otp, photoNumber) => async dispatch => {
    try {
      dispatch({type: UPDATE_BOOKING_STATUS_REQUEST});

      const config = {'Content-Type': 'application/json'};
      const {data} = await axiosInstance.put(
        `${BASE_URL}/api/v1/bookings/updateStatus/${bookingId}`,
        {status, otp, photoNumber},
        config,
      );

      dispatch({type: UPDATE_BOOKING_STATUS_SUCCESS, payload: data.message});
    } catch (error) {
      dispatch({
        type: UPDATE_BOOKING_STATUS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// get pending amount of booking
export const getPendingAmountOfBooking = bookingId => async dispatch => {
  try {
    dispatch({type: GET_PENDING_AMOUNT_REQUEST});

    const config = {'Content-Type': 'application/json'};
    const {data} = await axiosInstance.get(
      `${BASE_URL}/api/v1/bookings/pendingAmount/${bookingId}`,
      config,
    );

    console.log(data, '123');

    dispatch({type: GET_PENDING_AMOUNT_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: GET_PENDING_AMOUNT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const cancelBookingRequest = (bookingId,contactNumber,serviceName) => async dispatch => {
  try {
    console.log('wrokin1');
    dispatch({type: CANCEL_BOOKING_REQUEST});

    const config = {headers: {'Content-Type': 'application/json'}};
    const {data} = await axiosInstance.post(
      `${BASE_URL}/api/v1/bookingrequest/cancel/${bookingId}`,
      config,
    );

    dispatch({
      type: CANCEL_BOOKING_SUCCESS,
      payload: data,
    });
    sendWhatsappBookingCancelToCustomer({
      phoneNumber:contactNumber,
      bookingId: data?.booking?._id,
      serviceName : serviceName,
      bookingDate: getDDMMYYDate(data?.booking?.date)
    }); //send whatsapp msg to customer
  } catch (error) {
    console.log('wrokin2', error);

    dispatch({
      type: CANCEL_BOOKING_FAIL,
      payload: error,
    });
  }
};

// Used to clear all the errors
export const clearErrors = () => async dispatch => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
