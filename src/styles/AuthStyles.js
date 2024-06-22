import {StyleSheet} from 'react-native';
import {deviceHeight, deviceWidth} from '../helpers/Dimensions';
import Colors from '../helpers/Colors';

const AuthStyles = StyleSheet.create({
  formContainer: {
    marginHorizontal: deviceWidth * 0.1,
    elevation: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 34,
    paddingHorizontal: 19,
    marginTop: -(deviceHeight * 0.12),
    marginBottom: 25,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  inputField: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 10,
    padding: 10,
    color: 'black',
  },
});

export default AuthStyles;
