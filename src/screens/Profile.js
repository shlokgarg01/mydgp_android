import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ComponentStyles from '../styles/ComponentStyles';
import CTABtn from '../components/CTABtn';
import Colors from '../helpers/Colors';
import Modal from 'react-native-modal';
import { useState } from 'react';
import InputGroup from '../components/InputGroup';
import Btn from '../components/Btn';
import { useEffect } from 'react';
import { UPDATE_PROFILE_RESET } from '../constants/UserConstants';
import { showToast } from '../helpers/ShowToast';
import { logout, updateUserDetails } from '../actions/UserActions';
import Loader from '../components/Loader';
import { useNavigation } from '@react-navigation/native';
import RouteNames from '../routes/RouteNames';
import { Image } from 'react-native';
import { deviceWidth } from '../helpers/Dimensions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Profile() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector(state => state.user);
  const { loading, isUpdated, error } = useSelector(state => state.profile);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  useEffect(() => {
    if (error) {
      showToast('error', error);
    }

    // if (isUpdated) {
    // showToast(
    //   'success',
    //   'Update successful',
    // );
    //   navigation.push(RouteNames.DRAWERS.HOME);
    //   dispatch({type: UPDATE_PROFILE_RESET});
    // }
  }, [
    error
    // , isUpdated
  ]);

  const logoutHandler = () => {
    dispatch(logout());
    showToast('success', 'Logout successful');
  };

  const updateProfile = () => {
    dispatch(
      updateUserDetails({ name, email, contactNumber: user?.contactNumber }),
    );
    setIsModalOpen(!isModalOpen);
  };

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        <>
          <View style={{ alignItems: 'center' }}>
            <Image
              // source={{ uri: 'https://picsum.photos/200/300' }}
              source={{ uri: 'https://static-00.iconduck.com/assets.00/profile-major-icon-512x512-xosjbbdq.png' }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
                marginVertical: 16,
              }}
            />
            <View style={[ComponentStyles.horizontalAlign, { marginBottom: 10 }]}>
              <Text style={{ fontSize: 28, fontWeight: 'bold' }}>
                {user?.name}
              </Text>
            </View>
            <View
              style={{
                width: deviceWidth,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>4.5</Text>
                <Text style={{ fontSize: 22 }}>Rating</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{user?.orders}</Text>
                <Text style={{ fontSize: 22 }}>Orders</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{user?.days}</Text>
                <Text style={{ fontSize: 22 }}>Days</Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: Colors.GRAY,
              borderBottomWidth: 1,
              marginTop: 10,
              marginBottom: 22,
            }}
          />
          <View
            style={[
              ComponentStyles.horizontalAlign,
              {
                margin: 10,
                backgroundColor: Colors.GRAY_BG,
                borderRadius: 10,
                padding: 10,
              },
            ]}>
            <Icon
              name="email-check-outline"
              size={25}
              color={Colors.BLACK}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.textRegular}>{user?.email}</Text>
          </View>
          <View
            style={[
              ComponentStyles.horizontalAlign,
              {
                margin: 10,
                backgroundColor: Colors.GRAY_BG,
                borderRadius: 10,
                padding: 10,
              },
            ]}>
            <Icon
              name="phone"
              size={25}
              color={Colors.BLACK}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.textRegular}>{user?.contactNumber}</Text>
          </View>
          {/* <View style={{alignItems: 'center'}}>
            <CTABtn
              icon="pencil-outline"
              iconColor={Colors.WHITE}
              label="Edit"
              onClick={() => setIsModalOpen(!isModalOpen)}
              bgColor={Colors.PRIMARY}
              color={Colors.WHITE}
            />
          </View> */}

          <TouchableOpacity
            onPress={logoutHandler}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 16,
            }}>
            <Icon name="power" size={25} color={Colors.RED} />
            <Text style={{ fontSize: 19, color: Colors.RED, marginLeft: 10 }}>
              Logout
            </Text>
          </TouchableOpacity>

          <Modal
            isVisible={isModalOpen}
            backdropOpacity={0.5}
            onBackdropPress={() => setIsModalOpen(!isModalOpen)}
            onBackButtonPress={() => setIsModalOpen(!isModalOpen)}>
            <View style={{ backgroundColor: Colors.WHITE, padding: 22 }}>
              <Text
                style={[
                  styles.textBold,
                  { fontSize: 28, textAlign: 'center', marginBottom: 16 },
                ]}>
                Edit Profile
              </Text>
              <InputGroup
                placeholder="Name"
                value={name}
                label="Name"
                onChange={val => setName(val)}
              />
              <InputGroup
                placeholder="Email"
                value={email}
                label="Email"
                onChange={val => setEmail(val)}
              />
              <InputGroup
                placeholder="Contact Number"
                value={user?.contactNumber}
                label="Contact Number"
                editable={false}
              />
              <Btn label="Update" onClick={updateProfile} />
            </View>
          </Modal>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textBold: { fontSize: 19, fontWeight: 'bold' },
  textRegular: { fontSize: 19 },
});
