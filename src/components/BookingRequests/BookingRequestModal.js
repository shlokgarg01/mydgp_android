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

const BookingRequestModal = ({
  bookingRequest,
  setBookingModalVisible,
  isBookingModalVisible,
}) => {
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

  const calculateTimeLeftInSeconds = (bookedTime, totalTime) => {
    const bookedTimestamp = new Date(bookedTime).getTime();
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - bookedTimestamp;
    return Math.max(0, totalTime - Math.floor(elapsedTime / 1000));
  };

  return (
    <Modal isVisible={isBookingModalVisible} backdropOpacity={0.8}>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: Colors.LIGHT_GRAY,
            alignItems: 'center',
            paddingTop: 30,
          }}>
          <CountdownCircleTimer
            isPlaying
            // duration={calculateTimeLeftInSeconds(
            //   bookingRequest?.booking?.createdAt,
            //   60,
            // )}
            duration={60}
            size={80}
            strokeWidth={6}
            trailColor="white"
            colors={['#cd9a00', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}>
            {({remainingTime}) => (
              <Text style={{color: '#cd9a00', fontSize: 20}}>
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
              setBookingModalVisible(false);
              updateBookingRequest(Enums.BOOKING_REQUEST_STATUS.ACCEPTED);
              navigation.navigate(RouteNames.TODAY_BOOKINGS);
            }}
            label="ACCEPT"
            bgColor={Colors.THEME_COLOR}
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
    color: '#cd9a00',
    fontSize: 25,
    alignSelf: 'center',
    marginVertical: 20,
    fontWeight: '500',
  },
  bookingDetailText: {
    fontSize: 18,
  },
});
export default BookingRequestModal;
