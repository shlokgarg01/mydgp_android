import {
  CLEAR_ERRORS,
  REDEEM_DETAILS_FAIL,
  REDEEM_DETAILS_REQUEST,
  REDEEM_DETAILS_SUCCESS,
  REDEEM_FAIL,
  REDEEM_REQUEST,
  REDEEM_SUCCESS,
} from '../constants/RedeemConstants';

export const redeemReducer = (state = {redeem: {}}, action) => {
  switch (action.type) {
    case REDEEM_DETAILS_REQUEST:
      return {
        loading: true,
        redeem: {},
      };
    case REDEEM_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        redeem: action.payload,
      };
    case REDEEM_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        redeem: {},
      };
    case REDEEM_REQUEST:
      return {
        loading: true
      };
    case REDEEM_SUCCESS:
      return {
        ...state,
        loading: false,
        isSuccess: true,
        redeem: {}
      };
    case REDEEM_FAIL:
      return {
        ...state,
        loading: false,
        isSuccess: false,
        redeem: {},
        error: action.payload,
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
