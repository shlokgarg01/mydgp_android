import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import BookingRequestStyles from '../../styles/BookingRequestStyles';
import ComponentStyles from '../../styles/ComponentStyles';
import SubHeading from './SubHeading';
import { getDate } from '../../utils/DateTime';
import Enums from '../../helpers/Enums';
import Colors from '../../helpers/Colors';
import CTABtn from '../CTABtn';
import { useDispatch } from 'react-redux';
import { updateBookingRequestStatus } from '../../actions/BookingRequestsAction';

const BookingRequestsCard = ({ bookingRequest }) => {
  const dispatch = useDispatch();

  const updateBookingRequest = status => {
    dispatch(
      updateBookingRequestStatus({
        bookingRequestId: bookingRequest._id,
        status,
      }),
    );
  };

  return (
    <View style={BookingRequestStyles.requestCardContainer}>
      <View style={ComponentStyles.horizontalAlign}>
        <Text style={{ fontWeight: 'bold' }}>Booking Id - </Text>
        <Text>{bookingRequest?.booking?._id}</Text>
      </View>

      <SubHeading heading="Customer Info" />

      <View style={{ paddingHorizontal: 10 }}>
        <View style={ComponentStyles.horizontalAlign}>
          <Text style={{ fontWeight: 'bold' }}>Name - </Text>
          <Text>{bookingRequest.customer.name}</Text>
        </View>
        <View style={ComponentStyles.horizontalAlign}>
          <Text style={{ fontWeight: 'bold' }}>Contact Number - </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`tel:${bookingRequest.customer.contactNumber}`)
            }>
            <Text style={ComponentStyles.link}>
              {bookingRequest.customer.contactNumber}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <SubHeading heading="Booking Info" />
      <View style={{ paddingHorizontal: 10 }}>
        <View style={ComponentStyles.horizontalAlign}>
          <Text style={{ fontWeight: 'bold' }}>Date - </Text>
          <Text>{getDate(bookingRequest.booking?.date)}, for </Text>
          <Text style={{ fontWeight: 'bold' }}>
            {bookingRequest.booking?.hours}{' '}
            {bookingRequest.booking?.hours === 1 ? 'hour' : 'hours'}
          </Text>
        </View>
        <View style={ComponentStyles.horizontalAlign}>
          <Text style={{ fontWeight: 'bold' }}>Location - </Text>
          <Text>{bookingRequest.address?.address}, </Text>
          {bookingRequest.address?.landmark?.length > 0 ? (
            <Text>{bookingRequest.address?.landmark}, </Text>
          ) : null}
          <Text>{bookingRequest.address?.pincode}, </Text>
          <Text>
            {bookingRequest.address?.city} {bookingRequest.address?.state}
          </Text>
        </View>
        {/* <View style={ComponentStyles.horizontalAlign}>
          <Text style={{fontWeight: 'bold'}}>Payment - </Text>
          <Text
            style={{
              fontWeight: 'bold',
              color:
                bookingRequest.booking?.paymentInfo?.status ===
                Enums.PAYMENT_STATUS.PAID
                  ? Colors.DARK_GREEN
                  : Colors.RED,
            }}>
            {bookingRequest.booking?.paymentInfo?.status}
          </Text>
        </View> */}
      </View>

      <View style={ComponentStyles.horizontalEvenlyAlgin}>
        <CTABtn
          onClick={() =>
            updateBookingRequest(Enums.BOOKING_REQUEST_STATUS.ACCEPTED)
          }
          label="ACCEPT"
          bgColor={Colors.DARK_GREEN}
          color={Colors.WHITE}
        />
        <CTABtn
          onClick={() =>
            updateBookingRequest(Enums.BOOKING_REQUEST_STATUS.REJECTED)
          }
          label="REJECT"
          bgColor={Colors.GRAY_BG}
          color={Colors.BLACK}
        />
      </View>
    </View>
  );
};

export default BookingRequestsCard;
