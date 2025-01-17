import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { styles } from './ProfileForm.styles';
import { useSelector, useDispatch } from 'react-redux';
import { CheckBox } from 'react-native-elements';
// import CategoriesAccordion from '../../components/CategoriesAccordion/CategoriesAccordion';
import DocUploader from '../../components/DocUploader';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Btn from '../../components/Btn';
import { getAllServices } from '../../actions/ServiceActions';
import { AccordianStyles } from '../../components/CategoriesAccordion/CategoriesAccordion.styles';
import { showToast } from '../../helpers/ShowToast';
import {
  clearErrors,
  loadUser,
  updateUserDetails,
} from '../../actions/UserActions';
import Loader from '../../components/Loader';
import ProfilePhotoUpload from '../../components/UploadProfilePhoto';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../helpers/Colors';
import store from '../../../store';

const ProfileForm = () => {
  //   const navigation: any = useNavigation();
  const [idProofImage, setIdProofImage] = useState();
  const dispatch = useDispatch();
  const [selectedSubServices, setSelectedSubServices] = useState<string[]>([]);
  const [showSubServices, setShowSubServices] = useState<boolean>(false);
  const { services, loading: servicesLoading } = useSelector(
    state => state.services,
  );
  const { user } = useSelector(state => state.user);
  const { loading, isUpdated, error } = useSelector(state => state.profile);
  const navigation: any = useNavigation();
  const [imageCode, setImageCode] = useState();
  const [accountDetails, setAccountDetails] = useState(user?.accountDetails);
  const [equipmentDetails, setEquipmentDetails] = useState(
    user?.equipmentDetails,
  );
  const [portfolioLink, setPortfolioLink] = useState(user?.PortfolioLink);
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    if (services.length === 0) dispatch(getAllServices());
    setSelectedSubServices(user.subServices);
  }, []);

  useEffect(() => {
    if (isUpdated) {
      // showToast('success', 'Profile Updated!');
      dispatch(clearErrors());
    }
    if (error) {
      showToast('error', error);
      dispatch(clearErrors());
    }
  }, [isUpdated, error]);



  //   const handleServicesSelect = (
  //     selectedServices: string[],
  //     selectedSubServices: string[],
  //   ) => {
  //     console.log('Selected services:', selectedServices);
  //     console.log('Selected sub-services:', selectedSubServices);
  //     Handle selected services and sub-services
  //   };

  const updateSubServices = id => {
    let updatedIds = selectedSubServices.includes(id)
      ? selectedSubServices.filter(subServiceId => subServiceId !== id)
      : [...selectedSubServices, id];
    setSelectedSubServices(updatedIds);
  };

  //returns list of services/categories
  const getServicesList = () => {
    if (user?.service == '662de46f95110c7859d53e49') {
      //in case of 'both', return all services.
      return services;
    } else {
      //returns only registered service.
      return [services.find(service => service._id === user?.service)];
    }
  };

  const handleSubmit = () => {
    dispatch(
      updateUserDetails({
        subServices: selectedSubServices,
        isProfileUpdated: true,
        avatar: imageCode,
        accountDetails: accountDetails,
        equipmentDetails: equipmentDetails,
        PortfolioLink: portfolioLink,
      }),
    );
    setTimeout(() => {
      store.dispatch(loadUser());
    }, 500);
  };

  return loading || servicesLoading ? (
    <Loader />
  ) : (
    <View>
      <View style={styles.topBar}>
        <Icon
          name="chevron-left"
          size={16}
          color={'white'}
          style={{}}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.heading}>Complete your profile</Text>
      </View>
      <ScrollView style={styles.contentSection}>
        <ProfilePhotoUpload setImageCode={setImageCode} user={user} />
        <View style={styles.uploadContainer}>
          <DocUploader setDocument={setIdProofImage} title="Upload ID Proof" />
          <Text style={{ color: Colors.GRAY, fontSize: 14, marginTop: 2 }}>
            Please upload Aadhar card, Pan Card or driving license scanned copy*
          </Text>
        </View>
        {/* {services.length > 0 && console.log(services.filter(service => service._id === user.service))} */}
        {services.length > 0 && (
            // <CategoriesAccordion
            //   services={services.filter(service => service._id === user.service)}
            //   onServicesSelect={handleServicesSelect}
            // />

          <View>
            <Text style={AccordianStyles.heading}>What do you do?</Text>
            <FlatList
              data={getServicesList()?.[0]?.subServices}
              renderItem={({ item }) => (
                <View key={item._id}>
                  {/* <CheckBox
                        title={item.name}
                        checked={selectedServices.includes(item.name)}
                        onPress={() => toggleServiceSelection(item.name)}
                    /> */}
                  <View
                    style={AccordianStyles.categoryContainer}
                    onTouchEnd={() => {
                      // Toggle: if clicking on already expanded category, close it
                      // otherwise expand the clicked category
                      setExpandedCategoryId(expandedCategoryId === item._id ? null : item._id)
                    }}>
                   <Text>{item?.name} </Text>
                    <Icon
                      name={showSubServices ? 'chevron-up' : 'chevron-down'}
                      size={14}
                      color={'black'}
                    />
                  </View>
                  {/* {selectedServices.includes(item.name) && ( */}
                  {expandedCategoryId === item._id && (
                    <FlatList
                      data={item?.packages}
                      renderItem={({ item: packages }) => (
                        <CheckBox
                          key={packages._id}
                          title={packages.name}
                          checked={selectedSubServices.includes(packages._id)}
                          onPress={() => updateSubServices(packages._id)}
                        />
                      )}
                      keyExtractor={subService => subService}
                    />
                  )}
                  {/* )} */}
                </View>
              )}
              keyExtractor={item => item._id}
            />
            {/* <TouchableOpacity
            onPress={() => onServicesSelect(selectedServices, selectedSubServices)}
            style={styles.submitButton} >
            <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity> */}
          </View>
        )}

        <Text style={styles.subHeading}>Your Portfolio</Text>
        <TextInput
          placeholderTextColor={Colors.GRAY}
          style={styles.inputText}
          placeholder={'Portfolio Link'}
          value={portfolioLink}
          onChangeText={value => setPortfolioLink(value)}
        />

        <Text style={styles.subHeading}>Bank Details</Text>
       
        <TextInput
          keyboardType="numeric"
          placeholderTextColor={Colors.GRAY}
          style={styles.inputText}
          placeholder={'Account Number'}
          value={accountDetails?.accountNo?.toString()}
          onChangeText={value =>
            setAccountDetails((prevState: any) => ({
              ...prevState,
              accountNo: value,
            }))
          }
        />
         <TextInput
          placeholderTextColor={Colors.GRAY}
          style={styles.inputText}
          placeholder={'Account Holder Name'}
          value={accountDetails?.accountHolderName?.toString()}
          onChangeText={value =>
            setAccountDetails((prevState: any) => ({
              ...prevState,
              accountHolderName: value,
            }))
          }
        />
        <TextInput
          placeholderTextColor={Colors.GRAY}
          style={styles.inputText}
          placeholder={'IFSC'}
          value={accountDetails?.ifscCode?.toString()?.toUpperCase()}
          onChangeText={value =>
            setAccountDetails((prevState: any) => ({
              ...prevState,
              ifscCode: value,
            }))
          }
        />
         <TextInput
          placeholderTextColor={Colors.GRAY}
          style={styles.inputText}
          placeholder={'UPI ID'}
          value={accountDetails?.upiID?.toString()?.toUpperCase()}
          onChangeText={value =>
            setAccountDetails((prevState: any) => ({
              ...prevState,
              upiID: value,
            }))
          }
        />
         <TextInput
          placeholderTextColor={Colors.GRAY}
          style={styles.inputText}
          placeholder={'UPI Holder Name'}
          value={accountDetails?.upiName?.toString()?.toUpperCase()}
          onChangeText={value =>
            setAccountDetails((prevState: any) => ({
              ...prevState,
              upiName: value,
            }))
          }
        />
        <Text style={styles.subHeading}>What do you have?</Text>
        <TextInput
          placeholderTextColor={Colors.GRAY}
          style={styles.inputText}
          placeholder={'Your camera brand'}
          value={equipmentDetails?.val1}
          onChangeText={value =>
            setEquipmentDetails((prevState: any) => ({
              ...prevState,
              val1: value,
            }))
          }
        />
        <TextInput
          keyboardType="numeric"
          placeholderTextColor={Colors.GRAY}
          style={styles.inputText}
          placeholder={'Shutter count'}
          value={equipmentDetails?.val2}
          onChangeText={value =>
            setEquipmentDetails((prevState: any) => ({
              ...prevState,
              val2: value,
            }))
          }
        />
        <TextInput
          placeholderTextColor={Colors.GRAY}
          style={styles.inputText}
          placeholder={'Body'}
          value={equipmentDetails?.val3}
          onChangeText={value =>
            setEquipmentDetails((prevState: any) => ({
              ...prevState,
              val3: value,
            }))
          }
        />
        <TextInput
          placeholderTextColor={Colors.GRAY}
          style={styles.inputText}
          placeholder={'Lens'}
          value={equipmentDetails?.val4}
          onChangeText={value =>
            setEquipmentDetails((prevState: any) => ({
              ...prevState,
              val4: value,
            }))
          }
        />
        <TextInput
          placeholderTextColor={Colors.GRAY}
          style={styles.inputText}
          placeholder={'Monopod'}
          value={equipmentDetails?.val5}
          onChangeText={value =>
            setEquipmentDetails((prevState: any) => ({
              ...prevState,
              val5: value,
            }))
          }
        />
        <TextInput
          placeholderTextColor={Colors.GRAY}
          style={styles.inputText}
          placeholder={'Tripod'}
          value={equipmentDetails?.val6}
          onChangeText={value =>
            setEquipmentDetails((prevState: any) => ({
              ...prevState,
              val6: value,
            }))
          }
        />
        <TextInput
          placeholderTextColor={Colors.GRAY}
          style={styles.inputText}
          placeholder={'Gimbal'}
          value={equipmentDetails?.val7}
          onChangeText={value =>
            setEquipmentDetails((prevState: any) => ({
              ...prevState,
              val7: value,
            }))
          }
        />
        <TextInput
          placeholderTextColor={Colors.GRAY}
          style={styles.inputText}
          placeholder={'Slider'}
          value={equipmentDetails?.val8}
          onChangeText={value =>
            setEquipmentDetails((prevState: any) => ({
              ...prevState,
              val8: value,
            }))
          }
        />
        <TextInput
          placeholderTextColor={Colors.GRAY}
          style={styles.inputText}
          placeholder={'Flash'}
          value={equipmentDetails?.val9}
          onChangeText={value =>
            setEquipmentDetails((prevState: any) => ({
              ...prevState,
              val9: value,
            }))
          }
        />
        <TextInput
          placeholderTextColor={Colors.GRAY}
          style={styles.inputText}
          placeholder={'Mic'}
          value={equipmentDetails?.val10}
          onChangeText={value =>
            setEquipmentDetails((prevState: any) => ({
              ...prevState,
              val10: value,
            }))
          }
        />
        <TextInput
          placeholderTextColor={Colors.GRAY}
          style={styles.inputText}
          placeholder={'RGB light'}
          value={equipmentDetails?.val11}
          onChangeText={value =>
            setEquipmentDetails((prevState: any) => ({
              ...prevState,
              val11: value,
            }))
          }
        />
      </ScrollView>
      <View style={{ marginHorizontal: 20 }}>
        <Btn label="Submit" onClick={handleSubmit} />
      </View>
    </View>
  );
};

export default ProfileForm;
