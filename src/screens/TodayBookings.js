import {View, Text, FlatList, StyleSheet, BackHandler} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {showToast} from '../helpers/ShowToast';
import {clearErrors, getCurrentBookings} from '../actions/BookingsActions';
import Loader from '../components/Loader';
import Colors from '../helpers/Colors';
import BookingsCard from '../components/Bookings/BookingsCard';
import {useNavigation} from '@react-navigation/native';
import CTABtn from '../components/CTABtn';
import Btn from '../components/Btn';
import RouteNames from '../routes/RouteNames';

export default function TodayBookings() {
  const dispatch = useDispatch();
  const {loading, error, currentBookings} = useSelector(
    state => state.currentBookings,
  );
  const {cancelResponse} = useSelector(state => state.cancelBookingReducer);

  const {isUpdated} = useSelector(state => state.updateBookingStatus);
  const navigation = useNavigation();

  const updateDutyStatus = () => {
    setOnDuty(!onDuty);
    // TODO - make the call to the action to update the status on the backend
  };

  useEffect(() => {
    dispatch(getCurrentBookings());
  }, [cancelResponse]);

  useEffect(() => {
    dispatch(getCurrentBookings());

    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }
  }, [error, isUpdated]);

  const onRefresh = ()=>{
    dispatch(getCurrentBookings());
    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }
  }

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.earningsContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlist}
        onRefresh={onRefresh}
        refreshing={loading}
        ListEmptyComponent={() => (
          <>
            <Text style={styles.emptybookingsText}>
              No more bookings for today
            </Text>
            <Btn
              label={'Go Back to Home'}
              onClick={() => {
                navigation.navigate(RouteNames.CURRENT_BOOKINGS);
              }}
            />
          </>
        )}
        data={currentBookings}
        renderItem={({item}) => (
          <BookingsCard
            booking={item}
            showUpdateStatus={true}
            isCurrent={true}
            onRefresh={onRefresh}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  earningsContainer: {
    margin: 5,
  },
  emptybookingsText: {
    textAlign: 'center',
    fontSize: 25,
    color: Colors.GRAY,
    fontWeight: '500',
    marginTop: '80%',
  },
  flatlist: {
    paddingTop: 10,
    paddingBottom: 70,
    paddingHorizontal: 5,
  },
});
