import {createStore, combineReducers, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';
import {UserReducer, updateUserReducer} from './src/reducers/UserReducer';
import {
  bookingRequestsReducer,
  updateBookingRequestStatusReducer,
} from './src/reducers/BookingRequestReducer';
import {serviceReducer} from './src/reducers/ServiceReducer';
import {applyLeaveReducer, getLeavesReducer} from './src/reducers/LeaveReducer';
import {
  completedBookingsReducer,
  currentBookingsReducer,
  futureBookingsReducer,
  getBookingPendingAmtReducer,
  updateBookingStatusReducer,
} from './src/reducers/BookingsReducer';
import {redeemReducer} from './src/reducers/RedeemReducer';

const reducer = combineReducers({
  user: UserReducer,
  profile: updateUserReducer,

  services: serviceReducer,

  bookingRequests: bookingRequestsReducer,
  bookingRequest: updateBookingRequestStatusReducer,

  leave: applyLeaveReducer,
  allLeaves: getLeavesReducer,

  updateBookingStatus: updateBookingStatusReducer,
  completedBookings: completedBookingsReducer,
  currentBookings: currentBookingsReducer,
  futureBookings: futureBookingsReducer,
  getPendingAmt: getBookingPendingAmtReducer,
  redeem: redeemReducer,
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware),
);

export default store;
