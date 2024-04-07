import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../helpers/ShowToast';
import {useNavigation} from '@react-navigation/native';
import RouteNames from '../routes/RouteNames';
import Loader from '../components/Loader';
import {getAllBookingRequests} from '../actions/BookingRequestsAction';
import BookingRequestsCard from '../components/BookingRequests/BookingRequestsCard';
import {FlatList} from 'react-native';
import {CLEAR_ERRORS} from '../constants/BookingRequestsConstants';
import Colors from '../helpers/Colors';

const BookingRequests = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {isAuthenticated} = useSelector(state => state.user);
  const {loading, bookingRequests} = useSelector(
    state => state.bookingRequests,
  );
  const {error, isUpdated} = useSelector(state => state.bookingRequest);

  useEffect(() => {
    const getBookings = () => {
      dispatch(getAllBookingRequests());
    }

    getBookings()
    const interval = setInterval(() => getBookings(), 1500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {

    if (isAuthenticated === false) {
      navigation.reset({index: 1, routes: [{name: RouteNames.AUTH.LOGINOTP}]});
    } else if (error) {
      showToast('error', error);
      dispatch({type: CLEAR_ERRORS});
    } else if (isUpdated) {
      showToast('success', 'Booking Updated!');
    }
  }, [isAuthenticated, error, isUpdated]);

  // return loading ? (
  //   <Loader />
  // ) : (
    return <View>
      <FlatList
        ListEmptyComponent={() => (
          <Text style={styles.emptylistText}>No booking requests yet</Text>
        )}
        data={bookingRequests}
        renderItem={({item}) => <BookingRequestsCard bookingRequest={item} />}
        contentContainerStyle={{paddingBottom: 13}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  // );
};

const styles = StyleSheet.create({
  emptylistText: {
    textAlign: 'center',
    fontSize: 25,
    color: Colors.RED,
    fontWeight: 'bold',
    marginVertical: 16,
  },
});

export default BookingRequests;
