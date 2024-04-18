import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../helpers/ShowToast';
import { useNavigation } from '@react-navigation/native';
import RouteNames from '../routes/RouteNames';
import { getAllBookingRequests } from '../actions/BookingRequestsAction';
import BookingRequestsCard from '../components/BookingRequests/BookingRequestsCard';
import { FlatList } from 'react-native';
import { CLEAR_ERRORS } from '../constants/BookingRequestsConstants';
import Colors from '../helpers/Colors';
import {
  GET_CURRENT_BOOKINGS_FAIL,
  GET_CURRENT_BOOKINGS_REQUEST,
  GET_CURRENT_BOOKINGS_SUCCESS,
} from '../constants/BookingsConstants';
import axiosInstance, { BASE_URL } from '../Axios';

const BookingRequests = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isAuthenticated } = useSelector(state => state.user);
  const { loading, bookingRequests } = useSelector(
    state => state.bookingRequests,
  );
  const { currentBookings } = useSelector(
    state => state.currentBookings,
  );
  const { error, isUpdated } = useSelector(state => state.bookingRequest);

  useEffect(() => {
    dispatch(getCurrentBookings());

    const getBookings = () => {
      dispatch(getAllBookingRequests());
    }

    getBookings()
    const interval = setInterval(() => getBookings(), 1500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {

    if (isAuthenticated === false) {
      navigation.reset({ index: 1, routes: [{ name: RouteNames.AUTH.LOGINOTP }] });
    } else if (error) {
      showToast('error', error);
      dispatch({ type: CLEAR_ERRORS });
    } else if (isUpdated) {
      dispatch({ type: CLEAR_ERRORS })
      showToast('success', 'Booking Updated!');
    }
  }, [isAuthenticated, error, isUpdated]);

  // get all current bookings
  const getCurrentBookings = () => async dispatch => {
    try {
      dispatch({ type: GET_CURRENT_BOOKINGS_REQUEST });
      const { data } = await axiosInstance.get(
        `${BASE_URL}/api/v1/bookings/current`,
      );

      dispatch({ type: GET_CURRENT_BOOKINGS_SUCCESS, payload: data.bookings });
    } catch (error) {
      dispatch({
        type: GET_CURRENT_BOOKINGS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  // return loading ? (
  //   <Loader />
  // ) : (
  return <View style={{ padding: 20 }}>
    {
      currentBookings.length < 1 ?
        <FlatList
          ListEmptyComponent={() => (
            <Text style={styles.emptylistText}>No new booking requests</Text>
          )}
          data={bookingRequests}
          renderItem={({ item, index }) => index == 0 && <BookingRequestsCard bookingRequest={item} />}
          contentContainerStyle={{ paddingBottom: 13 }}
          showsVerticalScrollIndicator={false}
        />
        :
        <View >
          <Text style={styles.emptylistText}>
            Booking Already in queue. Complete that to get new bookings
          </Text>
          <Button title="Show my booking" onPress={() => {
            navigation.navigate(RouteNames.TODAY_BOOKINGS)
          }} />
        </View>
    }
  </View>
  // );
};

const styles = StyleSheet.create({
  emptylistText: {
    textAlign: 'center',
    fontSize: 22,
    color: Colors.GRAY,
    fontWeight: 'bold',
    marginVertical: 16,
  },
});

export default BookingRequests;
