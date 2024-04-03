import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Colors from '../helpers/Colors';
import { deviceWidth } from '../helpers/Dimensions';
import { useDispatch, useSelector } from 'react-redux';
import { getRedeemDetails, requestRedeemCoins } from '../actions/RedeemActions';
import Btn from '../components/Btn';
import { showToast } from '../helpers/ShowToast';
import { CLEAR_ERRORS } from '../constants/RedeemConstants';

const TotalEarnings = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const { redeem, error, isSuccess } = useSelector(state => state.redeem);

  const redeemCoins = () => {
    if (redeem.amountToBeRedeemed <= 0) {
      showToast("info", "No amount to redeem")
      return
    }
    dispatch(requestRedeemCoins(redeem.amountToBeRedeemed))
  };

  useEffect(() => {
    dispatch(getRedeemDetails());

    if (error) {
      // showToast('error', error);
      dispatch({ type: CLEAR_ERRORS });
    }

    if (isSuccess) {
      showToast("success", 'Request Sent!')
    }
  }, [dispatch, error, isSuccess]);

  const TotalEarningsTab = () => (
    <View>
      <Text style={styles.earnings}>
        Total Earnings - ₹ {redeem?.amountRedeemed || 0}
      </Text>
    </View>
  );

  const RedeemTab = () => (
    <View>
      <Text style={[styles.earnings, { color: Colors.RED }]}>
        Amount - ₹ {redeem?.amountToBeRedeemed || 0}
      </Text>
      <View style={{ marginHorizontal: 25 }}>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.DARK_GREEN,
    marginHorizontal: 5,
    marginVertical: 22,
  },
});

export default TotalEarnings;
