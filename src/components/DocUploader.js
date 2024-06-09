import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImageBase64 from 'react-native-image-base64';
import Colors from '../helpers/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DocUploader = ({setDocument, title}) => {
  const [uploaded, setUploaded] = useState(false);
  const uploadDoc = async () => {
    const document = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.images],
    });
    const base64Image = await ImageBase64.getBase64String(document.uri);
    setUploaded(true);
    setDocument(base64Image);
  };

  return (
    <>
      {uploaded ? (
        <TouchableOpacity style={styles.container}>
          <Text onPress={() => setUploaded(false)} style={styles.text}>
            Document uploaded <Icon name="close" size={18} color={'red'} />
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.container} onPress={uploadDoc}>
          <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.WHITE,
    textAlign: 'center',
    paddingVertical: 4,
    fontSize: 19,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: Colors.GRAY,
    borderRadius: 7,
    marginTop: 10,
  },
});

export default DocUploader;
