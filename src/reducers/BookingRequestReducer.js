import {
  CLEAR_ERRORS,
  GET_ALL_BOOKING_REQUESTS_FAIL,
  GET_ALL_BOOKING_REQUESTS_REQUEST,
  GET_ALL_BOOKING_REQUESTS_SUCCESS,
  UPDATE_BOOKING_REQUEST_STATUS_FAIL,
  UPDATE_BOOKING_REQUEST_STATUS_REQUEST,
  UPDATE_BOOKING_REQUEST_STATUS_SUCCESS,
} from '../constants/BookingRequestsConstants';

export const bookingRequestsReducer = (
  state = {bookingRequests: []},
  action,
) => {
  switch (action.type) {
    case GET_ALL_BOOKING_REQUESTS_REQUEST:
      return {
        loading: true,
        bookingRequests: state.bookingRequests,
      };
    case GET_ALL_BOOKING_REQUESTS_SUCCESS:
      return {
        ...state,
        loading: false,
        bookingRequests: action.payload,
      };
    case GET_ALL_BOOKING_REQUESTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        bookingRequests: [],
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export const updateBookingRequestStatusReducer = (
  state = {bookingRequest: {}},
  action,
) => {
  switch (action.type) {
    case UPDATE_BOOKING_REQUEST_STATUS_REQUEST:
      return {
        loading: true,
        bookingRequest: [],
      };
    case UPDATE_BOOKING_REQUEST_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: true,
        bookingRequest: action.payload,
      };
    case UPDATE_BOOKING_REQUEST_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isUpdated: false,
        bookingRequest: [],
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};
