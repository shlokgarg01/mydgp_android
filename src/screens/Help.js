// Import necessary modules from React and React Native
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Colors from '../helpers/Colors';

// Create the Help component
const Help = () => {
  const imageUrl =
    'https://cdni.iconscout.com/illustration/premium/thumb/customer-help-centre-4488109-3738501.png?f=webp';

  // Function to handle calling functionality
  const handleCall = () => {
    // Replace '1234567890' with your actual phone number
    Linking.openURL('tel:+918595703734');
  };

  // Function to handle opening WhatsApp
  const handleWhatsApp = () => {
    // Replace '1234567890' with your actual phone number
    Linking.openURL('https://wa.me/+918595703734');
  };

  return (
    <View style={styles.container}>
      <View style={styles.helpContent}>
        <Image
          resizeMode="contain"
          source={{uri: imageUrl}}
          style={styles.helpImage}
        />

        <View style={styles.contactInfo}>
          <Text style={styles.title}>Need Help?</Text>
          <Text>If you have any questions, feel free to contact us:</Text>
          <View style={styles.tabs}>
            <TouchableOpacity style={styles.button} onPress={handleCall}>
              <Text style={styles.buttonText}>Call Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleWhatsApp}>
              <Text style={styles.buttonText}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpContent: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  helpImage: {
    width: 300,
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
    zIndex: 100,
  },
  contactInfo: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.THEME_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Help;
