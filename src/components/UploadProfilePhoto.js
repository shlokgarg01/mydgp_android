import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Modal, Text} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const ProfilePhotoUpload = () => {
  const [photo, setPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleChoosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo',
    })
      .then(image => {
        const source = {uri: image.path};
        setPhoto(source);
        setModalVisible(false);
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
        setModalVisible(false);
      });
  };

  const handleTakePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo',
      useFrontCamera: true, // Specify to use the front camera
    })
      .then(image => {
        const source = {uri: image.path};
        setPhoto(source);
        setModalVisible(false);
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
        setModalVisible(false);
      });
  };

  const handleProfilePhotoPress = () => {
    setModalVisible(true);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableOpacity onPress={handleProfilePhotoPress}>
        <View
          style={{
            height: 150,
            width: 150,
            borderRadius: 75,
            marginTop: 20,
            backgroundColor: 'lightgray',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {photo === null ? (
            <Text>Select Profile Photo</Text>
          ) : (
            <Image
              source={photo}
              style={{height: 150, width: 150, borderRadius: 75}}
            />
          )}
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              paddingVertical: 20,
              width: '100%',
            }}>
            <TouchableOpacity onPress={handleTakePhoto}>
              <Text style={{padding: 20}}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChoosePhoto}>
              <Text style={{padding: 20}}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{padding: 20, textAlign: 'center'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfilePhotoUpload;
