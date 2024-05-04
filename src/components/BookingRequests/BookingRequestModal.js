import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import Enums from '../../helpers/Enums';
import RouteNames from '../../routes/RouteNames';
import ComponentStyles from '../../styles/ComponentStyles';
import {getDate} from '../../utils/DateTime';
import CTABtn from '../CTABtn';
import Colors from '../../helpers/Colors';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import {useDispatch} from 'react-redux';
import {updateBookingRequestStatus} from '../../actions/BookingRequestsAction';
import {useNavigation} from '@react-navigation/native';

const BookingRequestModal = ({bookingRequest}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const updateBookingRequest = status => {
    dispatch(
      updateBookingRequestStatus({
        bookingRequestId: bookingRequest._id,
        status,
      }),
    );
  };

  return (
    <Modal isVisible={true} backdropOpacity={0.8}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: Colors.BLUE,
            alignItems: 'center',
            paddingTop: 30,
          }}>
          <CountdownCircleTimer
            isPlaying
            duration={30}
            size={80}
            strokeWidth={6}
            colors={['#000475', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}>
            {({remainingTime}) => (
              <Text style={{color: 'white', fontSize: 15}}>
                {remainingTime}
              </Text>
            )}
          </CountdownCircleTimer>
          <Text style={styles.cardHeading}>New Booking Request</Text>
        </View>
        <View style={{padding: 20}}>
          <View style={ComponentStyles.horizontalAlign}>
            <Text style={[styles.bookingDetailText, {fontWeight: 'bold'}]}>
              Booking Id -{' '}
            </Text>
            <Text style={styles.bookingDetailText}>
              {bookingRequest?.booking?._id}
            </Text>
          </View>
          <View>
            <View style={ComponentStyles.horizontalAlign}>
              <Text style={[styles.bookingDetailText, {fontWeight: 'bold'}]}>
                Date -{' '}
              </Text>
              <Text style={styles.bookingDetailText}>
                {getDate(bookingRequest.booking?.date)}, for{' '}
              </Text>
              <Text style={[styles.bookingDetailText, {fontWeight: 'bold'}]}>
                {bookingRequest.booking?.hours}{' '}
                {bookingRequest.booking?.hours === 1 ? 'hour' : 'hours'}
              </Text>
            </View>
            <View style={ComponentStyles.horizontalAlign}>
              <Text style={[styles.bookingDetailText, {fontWeight: 'bold'}]}>
                Location -{' '}
              </Text>
              <Text style={styles.bookingDetailText}>
                {bookingRequest.address?.address},{' '}
              </Text>
              {bookingRequest.address?.landmark?.length > 0 ? (
                <Text>{bookingRequest.address?.landmark}, </Text>
              ) : null}
              <Text>{bookingRequest.address?.pincode}, </Text>
              <Text>
                {bookingRequest.address?.city} {bookingRequest.address?.state}
              </Text>
            </View>
          </View>
        </View>

        <View style={[ComponentStyles.horizontalEvenlyAlgin]}>
          <CTABtn
            onClick={() => {
              updateBookingRequest(Enums.BOOKING_REQUEST_STATUS.ACCEPTED);
              navigation.navigate(RouteNames.TODAY_BOOKINGS);
            }}
            label="ACCEPT"
            bgColor={Colors.BLUE}
            color={Colors.WHITE}
            width={'80%'}
          />
          <CTABtn
            onClick={() =>
              updateBookingRequest(Enums.BOOKING_REQUEST_STATUS.REJECTED)
            }
            label="SKIP"
            bgColor={Colors.GRAY_BG}
            color={Colors.BLACK}
            width={'15%'}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: -20,
    left: -20,
    right: -20,
  },
  cardHeading: {
    color: 'white',
    fontSize: 25,
    alignSelf: 'center',
    marginVertical: 20,
  },
  bookingDetailText: {
    fontSize: 18,
  },
});
export default BookingRequestModal;
