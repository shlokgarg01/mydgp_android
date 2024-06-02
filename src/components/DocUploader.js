import React from 'react';
import DocumentPicker from 'react-native-document-picker';
import {Text, TouchableOpacity} from 'react-native';
import ImageBase64 from 'react-native-image-base64';
import Colors from '../helpers/Colors';

const DocUploader = ({setDocument, title}) => {
  const uploadDoc = async () => {
    const document = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.images],
    });
    const base64Image = await ImageBase64.getBase64String(document.uri);
    setDocument(base64Image);
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.GRAY,
        borderRadius: 7,
        marginTop: 10,
      }}
      onPress={uploadDoc}>
      <Text
        style={{
          color: Colors.WHITE,
          textAlign: 'center',
          paddingVertical: 4,
          fontSize: 19,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default DocUploader;
