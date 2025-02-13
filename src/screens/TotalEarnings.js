import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Modal} from 'react-native';
import Colors from '../helpers/Colors';
import {deviceWidth} from '../helpers/Dimensions';
import {useDispatch, useSelector} from 'react-redux';
import {getRedeemDetails, requestRedeemCoins} from '../actions/RedeemActions';
import Btn from '../components/Btn';
import {showToast} from '../helpers/ShowToast';
import {CLEAR_ERRORS} from '../constants/RedeemConstants';
import Loader from '../components/Loader';
import RedeemRequestModal from '../components/RedeemRequestModal';

const TotalEarnings = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const {redeem, error, isSuccess, loading} = useSelector(
    state => state.redeem,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [amountToRedeem, setAmountToRedeem] = useState(0);

  const redeemCoins = () => {
    if (redeem?.redeem?.amountToBeRedeemed <= 0) {
      showToast('info', 'No amount to redeem');
      return;
    }
    setAmountToRedeem(redeem?.redeem?.amountToBeRedeemed);
    setModalVisible(true);
  };

  const confirmRedeem = () => {
    dispatch(requestRedeemCoins(amountToRedeem));
    setModalVisible(false);
  };

  const cancelRedeem = () => {
    setModalVisible(false);
  };

  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return `${rhours}:${rminutes}`;
  }

  useEffect(() => {
    dispatch(getRedeemDetails());

    if (error) {
      // showToast('error', error);
      dispatch({type: CLEAR_ERRORS});
    }

    if (isSuccess) {
      showToast('success', 'Redeem Request Sent! You will Receive the payments in 3 working days!');
    }
  }, [dispatch, error, isSuccess]);

  const ValueContainer = props => (
    <View style={styles.valueContainer}>
      <Text style={styles.valueHeading}>{props?.heading}</Text>
      <Text style={[styles.earnings]}>{props?.value}</Text>
    </View>
  );

  const TotalEarningsTab = () =>
    loading ? (
      <Loader />
    ) : (
      <View>
        <Text style={styles.heading}>Today's</Text>
        <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
          {/* <ValueContainer
            heading={'Cash Collected'}
            value={'₹' + Math.round(redeem?.cashCollected?.today) || 0}
          /> */}
          <ValueContainer
            heading={'Earnings'}
            value={'₹' + Math.round(redeem?.earnings?.today) || 0}
          />
          <ValueContainer
            heading={'Time (HH:MM)'}
            value={timeConvert(redeem?.minutesServiced?.today) || 0}
          />
        </View>
        <Text style={styles.heading}>Last 7 Days</Text>
        <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
          {/* <ValueContainer
            heading={'Cash Collected'}
            value={'₹' + Math.round(redeem?.cashCollected?.lastWeek) || 0}
          /> */}
          <ValueContainer
            heading={'Earnings'}
            value={'₹' + Math.round(redeem?.earnings?.lastWeek) || 0}
          />
          <ValueContainer
            heading={'Time (HH:MM)'}
            value={timeConvert(redeem?.minutesServiced?.lastWeek) || 0}
          />
        </View>
        <Text style={styles.heading}>Last 30 Days</Text>
        <View style={{flexDirection: 'row'}}>
          {/* <ValueContainer
            heading={'Cash Collected'}
            value={'₹' + Math.round(redeem?.cashCollected?.lastMonth) || 0}
          /> */}
          <ValueContainer
            heading={'Earnings'}
            value={'₹' + Math.round(redeem?.earnings?.lastMonth) || 0}
          />
          <ValueContainer
            heading={'Time (HH:MM)'}
            value={timeConvert(redeem?.minutesServiced?.lastMonth) || 0}
          />
        </View>
        <Text style={styles.heading}>Total</Text>
        <View style={{flexDirection: 'row'}}>
          {/* <ValueContainer
            heading={'Cash Collected'}
            value={'₹' + Math.round(redeem?.cashCollected?.total) || 0}
          /> */}
          <ValueContainer
            heading={'Earnings'}
            value={'₹' + Math.round(redeem?.earnings?.total) || 0}
          />
          <ValueContainer
            heading={'Time (HH:MM)'}
            value={timeConvert(redeem?.minutesServiced?.total) || 0}
          />
        </View>
      </View>
    );    

  const RedeemTab = () => (
    <View>
      <Text style={[styles.earnings, {color: Colors.RED}]}>
        Amount - ₹ {redeem?.redeem?.amountToBeRedeemed || 0}
      </Text>
      <View style={{marginHorizontal: 25}}>
        <Btn
          label="Redeem"
          onClick={redeemCoins}
          color={Colors.WHITE}
          bgColor={Colors.BLACK}
        />
      </View>
    </View>
  );

  return (
    <View>
      {/* Tabs */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          style={[
            styles.tabContainer,
            {
              borderBottomWidth: activeIndex === 0 ? 2 : 0,
            },
          ]}
          onPress={() => setActiveIndex(0)}>
          <Text style={styles.tabTitle}>Total Earnings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabContainer,
            {
              borderBottomWidth: activeIndex === 1 ? 2 : 0,
            },
          ]}
          onPress={() => setActiveIndex(1)}>
          <Text style={styles.tabTitle}>Redeem</Text>
        </TouchableOpacity>
      </View>

      {activeIndex === 0 ? <TotalEarningsTab /> : <RedeemTab />}

     <RedeemRequestModal redeemAction={confirmRedeem} visible={modalVisible} setVisible={setModalVisible} amount={amountToRedeem} />
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    paddingVertical: 10,
    width: deviceWidth * 0.5,
    borderBottomColor: Colors.PRIMARY,
    borderRadius: 10,
  },
  tabTitle: {
    fontSize: 22,
    textAlign: 'center',
  },
  earnings: {
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '800',
    color: Colors.THEME_COLOR,
    marginTop: 18,
  },
  valueContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    padding: 5,
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    width: '48%',
    borderWidth: 2,
    borderColor: Colors.GRAY_BG,
  },
  heading: {
    fontSize: 16,
    marginStart: 10,
    marginTop: 10,
    color: Colors.BLACK,
    fontWeight: '500',
  },
});

export default TotalEarnings;
