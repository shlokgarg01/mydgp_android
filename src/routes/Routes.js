import React, {useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import RouteNames from './RouteNames';
import Splash from '../screens/Splash';
import Login from '../screens/Auth/Login';
import LoginOtp from '../screens/Auth/LoginOtp';
import SignupOtp from '../screens/Auth/SignupOtp';
import SignupOtpVerify from '../screens/Auth/SignupOtpVerify';
import Signup from '../screens/Auth/Signup';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../helpers/Colors';
import Profile from '../screens/Profile';
import AllBookings from '../screens/AllBookings';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CurrentBookings from '../screens/Home';
import TodayBookings from '../screens/TodayBookings';
import {Text, View} from 'react-native';
import TotalEarnings from '../screens/TotalEarnings';
import ProfileForm from '../screens/ProfileForm/ProfileForm';
import Help from '../screens/Help';
import DeviceInfo from 'react-native-device-info';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AppDrawerContent(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {isAuthenticated} = useSelector(state => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigation.reset({index: 1, routes: [{name: RouteNames.AUTH.LOGINOTP}]});
    }
  }, [isAuthenticated]);

  const logoutHandler = () => {
    dispatch(logout());
    showToast('success', 'Logout successful');
  };

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />       
      </DrawerContentScrollView>
      <View
          style={{
            marginTop: 'auto',
            marginBottom: 25,
            alignItems: 'center',
          }}>
          <Text style={{color: Colors.GRAY, fontSize: 12}}>
            Version {DeviceInfo.getVersion()}
          </Text>
        </View>
    </View>
  );
}

const drawerOptions = (title, icon) => ({
  title: title,
  drawerIcon: () => (
    <View
      style={{
        backgroundColor: Colors.LIGHT_GRAY,
        padding: 10,
        borderRadius: 100,
      }}>
      <Icon name={icon} size={22} />
    </View>
  ),
});

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.LIGHT_GRAY, elevation: 10},
        headerTitleStyle: {color: Colors.BLACK},
        headerTitleAlign: 'center',
        headerTintColor: Colors.BLACK,
        drawerActiveTintColor: Colors.PRIMARY,
        drawerInactiveTintColor: Colors.BLACK,
        drawerLabelStyle: {
          fontSize: 16,
        },
      }}
      initialRouteName={RouteNames.CURRENT_BOOKINGS}
      drawerContent={props => <AppDrawerContent {...props} />}>
      <Drawer.Screen
        name={RouteNames.PROFILE}
        component={Profile}
        options={() => drawerOptions('My Profile', 'account-outline')}
      />
      <Drawer.Screen
        name={RouteNames.CURRENT_BOOKINGS}
        component={CurrentBookings}
        options={() => drawerOptions('Home', 'home')}
      />
      <Drawer.Screen
        name={RouteNames.TODAY_BOOKINGS}
        component={TodayBookings}
        options={() => drawerOptions('Current Bookings', 'book-edit-outline')}
      />
      {/* <Drawer.Screen
        name={RouteNames.BOOKINGS}
        component={Bookings}
        options={() =>
          drawerOptions('Future Bookings', 'email-multiple-outline')
        }
      />*/}
      <Drawer.Screen
        name={RouteNames.ALL_BOOKINGS}
        component={AllBookings}
        options={() => drawerOptions('All Bookings', 'email-open-outline')}
      />
      <Drawer.Screen
        name={RouteNames.TOTAL_EARNINGS}
        component={TotalEarnings}
        options={() => drawerOptions('Earnings', 'account-cash')}
      />
      <Drawer.Screen
        name={RouteNames.HELP}
        component={Help}
        options={() => drawerOptions('Help', 'contacts')}
      />
      {/* <Drawer.Screen
        name={RouteNames.LEAVES}
        component={Leaves}
        options={() => drawerOptions('Leaves', 'home-city-outline')}
      /> */}
    </Drawer.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={RouteNames.SPLASH}>
        <Stack.Screen name={RouteNames.SPLASH} component={Splash} />
        <Stack.Screen name={RouteNames.DRAWERS.HOME} component={DrawerRoutes} />
        <Stack.Screen name={RouteNames.AUTH.LOGINOTP} component={LoginOtp} />
        <Stack.Screen name={RouteNames.AUTH.LOGIN} component={Login} />
        <Stack.Screen name={RouteNames.AUTH.SIGNUPOTP} component={SignupOtp} />
        <Stack.Screen
          name={RouteNames.AUTH.SIGNUPOTPVERIFY}
          component={SignupOtpVerify}
        />
        <Stack.Screen name={RouteNames.AUTH.SIGNUP} component={Signup} />
        <Stack.Screen name={RouteNames.PROFILE_FORM} component={ProfileForm} />
        <Stack.Screen name={RouteNames.HELP} component={Help} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
