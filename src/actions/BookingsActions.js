import axiosInstance, {BASE_URL} from '../Axios';
import {
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
  (bookingId, status, otp) => async dispatch => {
    try {
      dispatch({type: UPDATE_BOOKING_STATUS_REQUEST});

      const config = {'Content-Type': 'application/json'};
      const {data} = await axiosInstance.put(
        `${BASE_URL}/api/v1/bookings/updateStatus/${bookingId}`,
        {status, otp},
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

// Used to clear all the errors
export const clearErrors = () => async dispatch => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
