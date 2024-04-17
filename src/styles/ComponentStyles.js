import { StyleSheet } from 'react-native';
import Colors from '../helpers/Colors';
import { deviceHeight } from '../helpers/Dimensions';

const ComponentStyles = StyleSheet.create({
  inputLabel: {
    color: Colors.BLACK,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  inputField: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 10,
    height: 37,
    paddingLeft: 10,
  },
  dropDownInput: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 10,
    height: 37,
    paddingLeft: 10,
    borderWidth: 0,
    minHeight: 20,
  },
  inputGroupContainer: {
    marginVertical: 5,
  },
  inputLabelGroupContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 7,
  },
  inputLabelGroupLabel: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 100,
    color: Colors.PRIMARY,
    fontSize: 13,
    fontWeight: 'bold',
    marginRight: 15,
  },
  btnContainer: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: 20,
    elevation: 2,
  },
  btnLabel: {
    color: Colors.WHITE,
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 7,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.2)',
    zIndex: 5,
  },
  loaderSubContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingRequestHeading: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 7,
    marginBottom: 3
  },
  cardContainer: {
    elevation: 7,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
    marginVertical: 5,
    paddingVertical: 7,
  },

  // flex styles
  horizontalAlign: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    flexWrap: 'wrap'
  },
  horizontalBetweenAlgin: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  horizontalEvenlyAlgin: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },

  // general styles
  link: {
    color: Colors.BLUE,
    fontWeight: "bold"
  }
});

export default ComponentStyles;
