import React, {useState} from 'react';
import {View, Linking} from 'react-native';
import ShowInfo from '../ShowInfo';
import ComponentStyles from '../../styles/ComponentStyles';
import {getDate} from '../../utils/DateTime';
import SubHeading from '../BookingRequests/SubHeading';
import Colors from '../../helpers/Colors';
import Badge from '../Badge';
import DropDown from '../../components/Dropdown';
import Btn from '../Btn';
import Enums from '../../helpers/Enums';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../Loader';
import {
  getPendingAmountOfBooking,
  updateBookingStatus,
} from '../../actions/BookingsActions';
import {useEffect} from 'react';
import {showToast} from '../../helpers/ShowToast';
import {CLEAR_ERRORS} from '../../constants/BookingsConstants';
import InputGroup from '../InputGroup';
import GetLocation, {
  Location,
  LocationErrorCode,
  isLocationError,
} from 'react-native-get-location';
import OtpModal from '../OtpModal/OtpModal';
import PendingPayment from '../PendingPayment';

const BookingsCard = ({booking, showUpdateStatus}) => {
  const dispatch = useDispatch();
  const {error, loading, isUpdated} = useSelector(
    state => state.updateBookingStatus,
  );
  const {charges} = useSelector(state => state.getPendingAmt);
  const [location, setLocation] = useState(null);
  const [isStatusUpdateOpen, setIsStatusUpdateOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [otp, setOtp] = useState(null);
  const [isOtpModalVisible, setOtpModalVisible] = useState(false);
  const [isPendingAmtVisible, setPendingAmtVisible] = useState(false);

  const statuses =
    booking.status === Enums.BOOKING_STATUS.ACCEPTED
      ? [
          {
            label: Enums.BOOKING_STATUS.ONGOING,
            value: Enums.BOOKING_STATUS.ONGOING,
          },
        ]
      : booking.status === Enums.BOOKING_STATUS.ONGOING
      ? [
          {
            label: Enums.BOOKING_STATUS.CLOSED,
            value: Enums.BOOKING_STATUS.CLOSED,
          },
        ]
      : [
          {
            label: Enums.BOOKING_STATUS.COMPLETED,
            value: Enums.BOOKING_STATUS.COMPLETED,
          },
        ];

  useEffect(() => {
    setStatus(statuses?.[0]?.value);
  }, [booking.status]);

  const updateStatusHandler = () => {
    if (booking.status === Enums.BOOKING_STATUS.ACCEPTED && !otp) {
      showToast('error', 'OTP is required');
      return;
    }
    dispatch(updateBookingStatus(booking._id, status, parseInt(otp)));
  };

  //checks pending amount of closed booking.
  useEffect(() => {
    if (booking.status === 'CLOSED') {
      getPendingAmount();
      if (charges > 0) {
        //show pending amount
        setPendingAmtVisible(true);
      } else {
        //mark booking completed
        dispatch(updateBookingStatus(booking._id, status));
      }
    }
  }, [booking.status]);

  const openMap = (lat, long) => {
    var mapUrl = `https://www.google.com/maps?q=${lat},${long}`;
    Linking.openURL(mapUrl);
  };

  const requestLocation = () => {
    setLocation(null);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
      rationale: {
        title: 'Location permission',
        message: 'The app needs the permission to request your location.',
        buttonPositive: 'Ok',
      },
    })
      .then(newLocation => {
        setLocation(newLocation);
      })
      .catch(ex => {
        if (isLocationError(ex)) {
          const {code, message} = ex;
          console.warn(code, message);
        } else {
          console.warn(ex);
        }
        setLocation(null);
      });
  };

  //calculate distance between rider and booking location in kms.
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const deg2rad = deg => deg * (Math.PI / 180);

    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    // if (distance >= 1) {
    //   return distance.toFixed(2) + ' km';
    // } else {
    //   return (distance * 1000).toFixed(2) + ' meters';
    // }
    return distance;
  };

  //checks if rider is within 500 meters to booking location.
  const isArrived = () => {
    if (
      getDistanceFromLatLonInKm(
        booking.address.coordinates.lat,
        booking.address.coordinates.lng,
        location?.latitude,
        location?.longitude,
      ) > 0.05
    ) {
      return false;
    } else {
      return true;
    }
  };

  const getPendingAmount = () => {
    dispatch(getPendingAmountOfBooking(booking._id));
  };

  useEffect(() => {
    requestLocation();
    if (error) {
      // showToast('error', error);
      dispatch({type: CLEAR_ERRORS});
    } else if (isUpdated) {
      dispatch({type: CLEAR_ERRORS});
      // showToast('success', 'Booking Status Updated');
    }
  }, [error, isUpdated]);

  return loading ? (
    <Loader />
  ) : (
    <View style={ComponentStyles.cardContainer}>
      <View
        style={[
          ComponentStyles.horizontalBetweenAlgin,
          {alignItems: 'flex-start', paddingRight: 10},
        ]}>
        <View>
          <ShowInfo title="Id" info={booking?._id} boldInfo={true} />
          <ShowInfo title="Date" info={getDate(booking?.date)} />
          <ShowInfo
            title="Duration"
            info={`${booking?.hours} ${
              booking?.hours === 1 ? 'hour' : 'hours'
            } ${booking.minutes} ${booking?.hours === 1 ? 'min' : 'mins'}`}
          />

          <SubHeading
            styles={{paddingHorizontal: 10}}
            heading="Customer Info"
          />
          <View style={{paddingHorizontal: 10}}>
            <ShowInfo title="Name" info={booking.customer.name} />
            <ShowInfo
              title="Contact Number"
              info={booking.customer.contactNumber}
            />
          </View>

          {/* <SubHeading styles={{paddingHorizontal: 10}} heading="Address" /> */}
          <View style={{paddingHorizontal: 10}}>
            <ShowInfo title="Address" info={`${booking.address.address}`} />
            {/* <ShowInfo
              title="City"
              info={`${booking.address.city}, ${booking.address.state}`}
            />
            <ShowInfo title="Pincode" info={booking.address.pincode} /> */}
          </View>
        </View>

        <View>
          {showUpdateStatus ? (
            <Badge
              title={`${booking.status}`}
              bgColor={Colors.DARK_GREEN}
              color={'white'}
            />
          ) : null}
          {/* <Badge title={`₹ ${booking.totalPrice}`} bgColor={Colors.GREEN} /> */}
        </View>
      </View>
      {showUpdateStatus ? (
        <>
          {/* {booking.status === Enums.BOOKING_STATUS.ACCEPTED && (
            <View
              style={{ paddingHorizontal: 10, marginTop: 7, marginBottom: -10 }}>
              <InputGroup
                label="OTP"
                placeholder="Enter the Order OTP"
                value={otp}
                onChange={val => setOtp(val)}
                keyboardType="number-pad"
              />
            </View>
          )} */}
          <View style={{paddingHorizontal: 10, marginTop: 10}}>
            {/* <DropDown
              label="Update Status"
              value={status}
              setValue={val => setStatus(val)}
              items={statuses}
              open={isStatusUpdateOpen}
              setIsOpen={() => setIsStatusUpdateOpen(!isStatusUpdateOpen)}
              placeholder="------- Update Status -------"
              zIndex={2}
            /> */}
            {/* <Btn label="get loc" onClick={requestLocation} /> */}
            <Btn
              bgColor={Colors.THEME_COLOR}
              label={status == 'ONGOING' ? 'Arrived' : 'End Booking'}
              onClick={() => {
                requestLocation();
                if (isArrived()) {
                  setOtpModalVisible(true);
                } else {
                  showToast(error, 'You are away from location');
                }
              }}
            />
            {status == 'ONGOING' && (
              <Btn
                bgColor={Colors.THEME_COLOR}
                label="Go To Booking Location"
                onClick={() =>
                  openMap(
                    booking.address.coordinates.lat,
                    booking.address.coordinates.lng,
                  )
                }
              />
            )}
          </View>
        </>
      ) : null}
      <OtpModal
        isOtpModalVisible={isOtpModalVisible}
        setOtpModalVisible={setOtpModalVisible}
        submitAction={updateStatusHandler}
        setOtp={setOtp}
        isOtpVisible={status == 'ONGOING'}
      />
      {isPendingAmtVisible && (
        <PendingPayment
          amount={charges}
          onBtnPress={() => {
            dispatch(updateBookingStatus(booking._id, status));
            setPendingAmtVisible(false);
          }}
        />
      )}
    </View>
  );
};

export default BookingsCard;
