import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import Colors from '../helpers/Colors';
import {useSelector} from 'react-redux';
import RouteNames from '../routes/RouteNames';

interface IRedeemRequestModal {
  amount: number
  visible:boolean;
  setVisible: any;
  redeemAction:any
}
const RedeemRequestModal = (props: IRedeemRequestModal) => {
  const navigation:any = useNavigation();
  const {user} = useSelector((state: any) => state.user);

  return (
    <View>
      <Modal isVisible={props?.visible}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => props.setVisible(false)}>
            <Icon name="close" size={30} color="black" />
          </TouchableOpacity>
          <Image
            style={{
              height: 100,
              aspectRatio: 1,
              alignSelf: 'center',
              marginBottom: 19,
            }}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWJ2K84ZvIYrHrEmW1fHSNbEWmZKe-eepq9A&s',
            }}></Image>
          <Text style={styles.alertText}>You Earned ₹{props?.amount}</Text>
          <View style={{borderWidth: 1, borderColor: Colors.LIGHT_GRAY,marginTop:30}}></View>

          <View style={styles.textContainer}>
            <Text style={styles.alertText}>Account Details:</Text>
            <Text>Name: {user?.accountDetails?.accountHolderName}</Text>
            <Text>Account Number: {user?.accountDetails?.accountNo}</Text>
            <Text>
              IFSC: {user?.accountDetails?.ifscCode?.toString()?.toUpperCase()}
            </Text>
            {user?.accountDetails?.bankName && (
              <Text>Bank Name: {user?.accountDetails?.bankName}</Text>
            )}
            <Text>UPI: {user?.accountDetails?.upiID}</Text>
            <TouchableOpacity onPress={()=>{
                props?.setVisible(false)
                navigation.navigate(RouteNames.PROFILE_FORM)}}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={props?.redeemAction}>
            <Text style={styles.buttonText}>Redeem Now</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    height: 500,
    width: '100%',
    borderRadius: 20,
    padding: 30,
  },
  textContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  button: {
    backgroundColor: Colors.PRIMARY,
    position: 'absolute',
    height: 70,
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  alertText: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  alertIcon: {
    alignSelf: 'center',
    marginBottom: '8%',
  },
  editText: {
    color: 'blue',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

export default RedeemRequestModal;
