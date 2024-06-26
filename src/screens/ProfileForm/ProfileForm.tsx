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
import { clearErrors, loadUser, updateUserDetails } from '../../actions/UserActions';
import Loader from '../../components/Loader';
import ProfilePhotoUpload from '../../components/UploadProfilePhoto';
import { useNavigation } from '@react-navigation/native';
import RouteNames from '../../routes/RouteNames';
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

  const data: any = [
    {
      id: 1,
      name: 'Photography',
      subServices: [
        'Nature, Landscape',
        'Night Scape, Star',
        'Pet',
        'Wildlife,Animal & Birds',
        'Selfie',
        'Portrait',
        'Models(at photo shooting event)',
        'Street Photography',
        'Travel',
        'Music Recitals/school plays',
        'Sports',
        'Wedding',
        'Event - Parties,religious, conferences,awards,groups and team photos',
        'Fashion/Beauty',
        'Food',
        'Macro shooting',
        'Still Life',
        'Transportation',
        'Aerial',
        'Architecture',
        'Underwater',
        'Others',
      ],
    },
    {
      id: 2,
      name: 'Videography',
      subServices: [
        'Nature, Landscape',
        'Night Scape, Star',
        'Pet',
        'Wildlife,Animal & Birds',
        'Selfie',
        'Portrait',
        'Models(at photo shooting event)',
        'Street Photography',
        'Travel',
        'Music Recitals/school plays',
        'Sports',
        'Wedding',
        'Event - Parties,religious, conferences,awards,groups and team photos',
        'Fashion/Beauty',
        'Food',
        'Macro shooting',
        'Still Life',
        'Transportation',
        'Aerial',
        'Architecture',
        'Underwater',
        'Others',
      ],
    },
  ];

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

  const handleSubmit = () => {
    dispatch(
      updateUserDetails({
        subServices: selectedSubServices,
        isProfileUpdated: true,
        avatar: imageCode,
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
          onPress={() => { navigation.goBack() }}
        />
        <Text style={styles.heading}>Complete your profile</Text>
      </View>
      <ScrollView style={styles.contentSection}>
        <ProfilePhotoUpload
          setImageCode={setImageCode}
          user={user}
        />
        <View style={styles.uploadContainer}>
          <DocUploader setDocument={setIdProofImage} title="Upload ID Proof" />
        </View>
        {/* {services.length > 0 && console.log(services.filter(service => service._id === user.service))} */}
        {services.length > 0 && (
          //   <CategoriesAccordion
          //     services={services.filter(service => service._id === user.service)}
          //     onServicesSelect={handleServicesSelect}
          //   />

          <View>
            <Text style={AccordianStyles.heading}>What do you do?</Text>
            <FlatList
              data={[services.find(service => service._id === user.service)]}
              renderItem={({ item }) => (
                <View key={item._id}>
                  {/* <CheckBox
                        title={item.name}
                        checked={selectedServices.includes(item.name)}
                        onPress={() => toggleServiceSelection(item.name)}
                    /> */}
                  <Text
                    style={AccordianStyles.categoryContainer}
                    onPress={() => setShowSubServices(!showSubServices)}>
                    {item?.name}
                  </Text>
                  {/* {selectedServices.includes(item.name) && ( */}
                  {showSubServices && (
                    <FlatList
                      data={item?.subServices}
                      renderItem={({ item: subService }) => (
                        <CheckBox
                          key={subService._id}
                          title={subService.name}
                          checked={selectedSubServices.includes(subService._id)}
                          onPress={() => updateSubServices(subService._id)}
                          containerStyle={styles.subCategoryCheckboxContainer}
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
        <TextInput placeholderTextColor={Colors.GRAY} style={styles.inputText} placeholder={'Portfolio Link'} />

        <Text style={styles.subHeading}>Bank Details</Text>
        <TextInput placeholderTextColor={Colors.GRAY} style={styles.inputText} placeholder={'Account Holder Name'} />
        <TextInput keyboardType='numeric' placeholderTextColor={Colors.GRAY} style={styles.inputText} placeholder={'Account Number'} />
        <TextInput placeholderTextColor={Colors.GRAY} style={styles.inputText} placeholder={'IFSC'} />

        <Text style={styles.subHeading}>What do you have?</Text>
        <TextInput placeholderTextColor={Colors.GRAY} style={styles.inputText} placeholder={'Your camera brand'} />
        <TextInput keyboardType='numeric' placeholderTextColor={Colors.GRAY} style={styles.inputText} placeholder={'Shutter count'} />
        <TextInput placeholderTextColor={Colors.GRAY} style={styles.inputText} placeholder={'Body'} />
        <TextInput placeholderTextColor={Colors.GRAY} style={styles.inputText} placeholder={'Lens'} />
        <TextInput placeholderTextColor={Colors.GRAY} style={styles.inputText} placeholder={'Monopod'} />
        <TextInput placeholderTextColor={Colors.GRAY} style={styles.inputText} placeholder={'Tripod'} />
        <TextInput placeholderTextColor={Colors.GRAY} style={styles.inputText} placeholder={'Gimbal'} />
        <TextInput placeholderTextColor={Colors.GRAY} style={styles.inputText} placeholder={'Slider'} />
        <TextInput placeholderTextColor={Colors.GRAY} style={styles.inputText} placeholder={'Flash'} />
        <TextInput placeholderTextColor={Colors.GRAY} style={styles.inputText} placeholder={'Mic'} />
        <TextInput placeholderTextColor={Colors.GRAY} style={styles.inputText} placeholder={'RGB light'} />
      </ScrollView>
      <View style={{ marginHorizontal: 20 }}>
        <Btn label="Submit" onClick={handleSubmit} />
      </View>
    </View>
  );
};

export default ProfileForm;
