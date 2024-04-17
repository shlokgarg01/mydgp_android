import { StyleSheet } from "react-native";
import { deviceHeight, deviceWidth } from '../helpers/Dimensions'
import Colors from '../helpers/Colors'

const AuthComponentStyles = StyleSheet.create({
  bgContainer: {
    height: deviceHeight * 0.45,
    backgroundColor: Colors.PRIMARY,
    width: deviceWidth,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 50,
    alignItems: 'center',
  },
  logo: {
    height: 170,
    width: 170,
    borderRadius: 500,
  },
  companyName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.WHITE,
    marginVertical: 16,
  },
  btnSubTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7,
  },
  btnSubTextTitle: { fontSize: 15 },
  btnSubTextSubTitle: { color: Colors.PRIMARY, fontWeight: 'bold', fontSize: 15 },
})

export default AuthComponentStyles