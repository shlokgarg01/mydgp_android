import React, { useEffect, useState } from 'react';
import {Image, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../helpers/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

const ForceUpdate = React.memo(() => {
    const [isVisible,setVisible] = useState(false);
    const [response,setResponse] = useState<any>();

    useEffect(() => {
      const fetchUpdate = async () => {
        let token = await AsyncStorage.getItem('token');
        token = token ? JSON.parse(token) : '';
        try {
          const response = await fetch('https://mydgp.in/api/v1/app-update/team', {
            method: 'GET',
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          if (JSON.stringify(data?.response) !== JSON.stringify(response)) {
            setResponse(data?.response);
          }

          const currentVersion = await DeviceInfo.getVersion();          
          
          if (data?.response?.min_supported_version && currentVersion < data?.response?.min_supported_version && !isVisible) {
            setVisible(true);
          }
        } catch (error) {
            console.log(error,'error');
        }
      };
      fetchUpdate(); 
    }, []);
    
  return (
    <View>
      <Modal isVisible={isVisible}>
        <View style={styles.modalContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri: 'https://static.vecteezy.com/system/resources/previews/007/814/264/non_2x/system-update-software-upgrade-and-installation-program-concept-of-system-update-software-installation-flat-free-vector.jpg',
            }} />
          <Text style={styles.title}>{response?.title}</Text>
          <Text style={styles.subTitle}>
           {response?.subTitle}
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => {
              Linking.openURL('market://details?id=com.my__dgp'); 
            }}>
            <Text style={styles.buttonText}>UPDATE</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
});

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    height: 500,
    width: '100%',
    borderRadius: 20,
    padding: 30,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    position: 'absolute',
    height: 60,
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
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop:30,
  },
  subTitle:{
    textAlign:'center',
    color:Colors.GRAY,
    fontSize:18,
    marginTop:20,
  },
  image: {
    height: 200,
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 50,
  },
});

export default ForceUpdate;
