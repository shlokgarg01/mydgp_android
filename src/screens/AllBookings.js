import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {showToast} from '../helpers/ShowToast';
import {clearErrors, getCompletedBookings} from '../actions/BookingsActions';
import Loader from '../components/Loader';
import Colors from '../helpers/Colors';
import BookingsCard from '../components/Bookings/BookingsCard';
import WorkUrlModal from '../components/WorkUrlModal';

export default function AllBookings() {
  const dispatch = useDispatch();
  const {loading, error, completedBookings} = useSelector(
    state => state.completedBookings,
  );
  const [isWorkUrlVisible, setWorkUrlVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    dispatch(getCompletedBookings());

    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }
  }, [error]);

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.earningsContainer}>
      {/* <Text style={styles.earnings}>
        Total Earnings - ₹{' '}
        {completedBookings.reduce((sum, booking) => sum + booking.totalPrice, 0)}
      </Text> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlist}
        ListEmptyComponent={() => (
          <Text style={styles.emptybookingsText}>
            No completed bookings yet
          </Text>
        )}
        data={completedBookings}
        renderItem={({item}) => (
          <BookingsCard
            booking={item}
            isCurrent={false}
            setWorkUrlModalVisible={setWorkUrlVisible}
            setSelectedBooking={setSelectedBooking}
          />
        )}
      />
      <WorkUrlModal
        isWorkUrlModalVisible={isWorkUrlVisible}
        setWorkUrlModalVisible={setWorkUrlVisible}
        selectedBooking={selectedBooking}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  earningsContainer: {
    margin: 5,
  },
  earnings: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.DARK_GREEN,
    marginHorizontal: 5,
    marginVertical: 22,
  },
  emptybookingsText: {
    textAlign: 'center',
    fontSize: 25,
    color: Colors.RED,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  flatlist: {
    paddingTop: 10,
    paddingHorizontal: 5,
  },
});
