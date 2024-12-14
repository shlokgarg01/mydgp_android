import React, {useState} from 'react';
import {View, Linking, Text, TouchableOpacity} from 'react-native';
import ShowInfo from '../ShowInfo';
import ComponentStyles from '../../styles/ComponentStyles';
import {getDate} from '../../utils/DateTime';
import SubHeading from '../BookingRequests/SubHeading';
import Colors from '../../helpers/Colors';
import Badge from '../Badge';
import Btn from '../Btn';
import Enums from '../../helpers/Enums';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../Loader';
import {
  cancelBookingRequest,
  getPendingAmountOfBooking,
  updateBookingStatus,
} from '../../actions/BookingsActions';
import {useEffect} from 'react';
import {showToast} from '../../helpers/ShowToast';
import {CLEAR_ERRORS} from '../../constants/BookingsConstants';
import GetLocation, {isLocationError} from 'react-native-get-location';
import OtpModal from '../OtpModal/OtpModal';
import PendingPayment from '../PendingPayment';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../Axios';
import { sendWhatsAppBookingOTP } from '../../utils/whatsappMsgsUtils';

const BookingsCard = ({
  booking,
  showUpdateStatus,
  isCurrent,
  setWorkUrlModalVisible,
  setSelectedBooking,
}) => {
  const dispatch = useDispatch();
  const {error, loading, isUpdated} = useSelector(
    state => state.updateBookingStatus,
  );
  const {charges} = useSelector(state => state.getPendingAmt);
  const [location, setLocation] = useState(null);
  const [isStatusUpdateOpen, setIsStatusUpdateOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [otp, setOtp] = useState(null);
  const [photoNumber, setPhotoNumber] = useState(null);
  const [isOtpModalVisible, setOtpModalVisible] = useState(false);
  const [isPendingAmtVisible, setPendingAmtVisible] = useState(false);
  const [isLocationLoading, setLocationLoading] = useState(false);
  const [isInitial, setInitial] = useState(true);
  const [isWorkUrlApproved, setWorkUrlApproved] = useState(false);
  const [isSubmitWorkLoading, setSubmitWorkLoading] = useState(false);
  const [otpTimer,setOtpTimer] = useState(0);
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
    if (booking.status === Enums.BOOKING_STATUS.ACCEPTED && (!otp || !photoNumber)) {
      showToast('error', 'Both OTP and Photo Number are required');
      return;
    }
    dispatch(
      updateBookingStatus(
        booking._id,
        status,
        parseInt(otp),
        parseInt(photoNumber),
      ),
    );
  };

  useEffect(() => {
    if (!isInitial && !isLocationLoading) {
      if (isArrived()) {
        setOtpModalVisible(true);
      } else {
        setOtpModalVisible(true);
        showToast(error, 'You are away from location');
      }
    }
    setInitial(false);
  }, [isLocationLoading]);

  //checks pending amount of closed booking.
  useEffect(() => {
    if (booking.status === 'CLOSED') {
      getPendingAmount();
      if (totalPendingAmt() > 0) {
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
    setLocationLoading(true);
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
        setLocationLoading(false);
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

  //if amount is not paid online then add booking amt to excess amount.
  const totalPendingAmt = () => {
    let totalPendingAmt = charges;
    if (booking?.paymentInfo?.status == 'NOT_PAID') {
      totalPendingAmt = totalPendingAmt + booking?.totalPrice;
    }
    return totalPendingAmt;
  };

  // get Delivery Request info of booking id
  const getDeliveryRequest = async requestId => {
    setSubmitWorkLoading(true);
    const url = `${BASE_URL}/api/v1/deliveryRequests/${requestId}`;
    let token = await AsyncStorage.getItem('token');
    token = token ? JSON.parse(token) : '';
    const headers = {
      Accept: 'application/json, text/plain, */*',
      Connection: 'keep-alive',
      'Content-Type': 'application/json',
      authorization: `${token}`,
    };
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      if (response.ok) {
        const data = await response.json();
        setWorkUrlApproved(false);
        setSubmitWorkLoading(false);
      } else {
        const errorData = await response.json();
        setWorkUrlApproved(true);
        setSubmitWorkLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const isWorkUrlApproved = () => {
  //   getDeliveryRequest(booking?._id);
  //   if (deliveryRequestData != null) {
  //     return false;
  //   }
  //   return true;
  // };

  //TODO: NOT REQUIRED RIGHT NOW. AUTOMATING IT.
  // useEffect(() => {
  //   getDeliveryRequest(booking?._id);
  // }, [isSubmitWorkLoading]);

  useEffect(() => {
    if (error) {
      if (error != 'Invalid Status!') {
        showToast('error', error);
      }
      dispatch({type: CLEAR_ERRORS});
    } else if (isUpdated) {
      dispatch({type: CLEAR_ERRORS});
      // showToast('success', 'Booking Status Updated');
    }
  }, [error, isUpdated]);

  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleSendOtp = ()=>{
    if(booking?.paymentInfo?.paymentReceived < 1){
      showToast('error','Advance payment not received')
    }else{
      sendWhatsAppBookingOTP(booking?.customer?.contactNumber,booking?.otp)
      setOtpTimer(60);
    }
  }

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
          <ShowInfo title="Booking Id" info={booking?._id} boldInfo={true} />
          <ShowInfo
            title="Category"
            info={`${booking?.subService?.name} ${booking?.service?.name}`}
          />
          <ShowInfo title="Date" info={getDate(booking?.date)} />
          <ShowInfo
            title="Duration"
            info={`${booking?.hours} ${
              booking?.hours === 1 ? 'hour' : 'hours'
            } ${booking.minutes} ${booking?.hours === 1 ? 'min' : 'mins'}`}
          />
          {!isCurrent && (
            <>
              <ShowInfo
                title="Start Photo Number"
                info={booking?.startPhotoNumber}
              />
              <ShowInfo
                title="End Photo Number"
                info={booking?.endPhotoNumber}
              />
              {isWorkUrlApproved && (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedBooking(booking);
                    setWorkUrlModalVisible(true);
                  }}>
                  <Text style={{fontSize: 16, padding: 10, color: Colors.BLUE}}>
                    Submit Work Url
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}

          {isCurrent && (
            <>
              <SubHeading
                styles={{paddingHorizontal: 10}}
                heading="Customer Info"
              />
              <View style={{paddingHorizontal: 10}}>
                <ShowInfo title="Name" info={booking?.customer?.name} />
              </View>

              <View style={{paddingHorizontal: 10}}>
                <ShowInfo title="Address" info={`${booking.address.address}`} />
              </View>
            </>
          )}
        </View>

        <View>
          {showUpdateStatus ? (
            <Badge
              title={`${booking.status}`}
              bgColor={Colors.DARK_GREEN}
              color={'white'}
            />
          ) : null}
        </View>
      </View>
      {isCurrent && (
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'left',
            paddingTop: 20,
            paddingLeft: 20,
          }}>
          <Icon
            onPress={() => {
              Linking.openURL(`tel:${booking.customer.contactNumber}`);
            }}
            name="call-outline"
            size={30}
            color={Colors.DARK_GREEN}
            style={{marginRight: 20}}
          />
          <Icon
            onPress={() => {
              Linking.openURL(
                `https://wa.me/+91${booking.customer.contactNumber}`,
              );
            }}
            color={Colors.DARK_GREEN}
            name="logo-whatsapp"
            size={30}
            style={{marginRight: 20}}
          />
        </View>
      )}
      {showUpdateStatus ? (
        <>
          <View style={{paddingHorizontal: 10, marginTop: 10}}>
            <Btn
              bgColor={Colors.THEME_COLOR}
              label={
                isLocationLoading
                  ? 'Fetching Location....'
                  : status == 'ONGOING'
                  ? 'Arrived'
                  : 'Complete Booking'
              }
              onClick={() => {
                if (status == 'ONGOING') {
                  requestLocation();
                } else {
                  setOtpModalVisible(true);
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
            <View style={{flexDirection:'row'}}>
            {status == 'ONGOING' && (
              <Btn
                bgColor={Colors.PRIMARY}
                style={{flex:1,marginRight:10}}
                label={otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : "Send OTP"}
                onClick={handleSendOtp}
                disabled={otpTimer > 0}
              />
            )}
            {status == 'ONGOING' && (
              <Btn
                bgColor={Colors.RED}
                label="Cancel"
                style={{flex:1}}
                onClick={() => {
                  dispatch(cancelBookingRequest(booking._id));
                }}
              />
            )}
            </View>
          </View>
        </>
      ) : null}
      <OtpModal
        isOtpModalVisible={isOtpModalVisible}
        setOtpModalVisible={setOtpModalVisible}
        submitAction={updateStatusHandler}
        setOtp={setOtp}
        setPhotoNumber={setPhotoNumber}
        isOtpVisible={status == 'ONGOING'}
      />
      {isPendingAmtVisible && (
        <PendingPayment
          amount={totalPendingAmt()}
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
