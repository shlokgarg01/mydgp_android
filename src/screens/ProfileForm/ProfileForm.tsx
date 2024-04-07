import React, { useState } from 'react'
import { Image, Text, View } from 'react-native'
import { styles } from './ProfileForm.styles';
import { useNavigation } from '@react-navigation/native';
import CategoriesAccordion from '../../components/CategoriesAccordion/CategoriesAccordion';
import DocUploader from '../../components/DocUploader';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ProfileForm = () => {
    const navigation: any = useNavigation();
    const [idProofImage, setIdProofImage] = useState();

    const data: any = [
        {
            id: 1,
            name: 'Photography',
            subServices: ['Nature, Landscape', 'Night Scape, Star', 'Pet', 'Wildlife,Animal & Birds', 'Selfie', 'Portrait', 'Models(at photo shooting event)', 'Street Photography', 'Travel', 'Music Recitals/school plays', 'Sports', 'Wedding', 'Event - Parties,religious, conferences,awards,groups and team photos', 'Fashion/Beauty', 'Food', 'Macro shooting', 'Still Life', 'Transportation', 'Aerial', 'Architecture', 'Underwater', 'Others'],
        },
        {
            id: 2,
            name: 'Videography',
            subServices: ['Nature, Landscape', 'Night Scape, Star', 'Pet', 'Wildlife,Animal & Birds', 'Selfie', 'Portrait', 'Models(at photo shooting event)', 'Street Photography', 'Travel', 'Music Recitals/school plays', 'Sports', 'Wedding', 'Event - Parties,religious, conferences,awards,groups and team photos', 'Fashion/Beauty', 'Food', 'Macro shooting', 'Still Life', 'Transportation', 'Aerial', 'Architecture', 'Underwater', 'Others'],
        },
    ];


    const handleServicesSelect = (selectedServices: string[], selectedSubServices: string[]) => {
        console.log('Selected services:', selectedServices);
        console.log('Selected sub-services:', selectedSubServices);
        // Handle selected services and sub-services
    };

    return (
        <View>
            <View style={styles.topBar}>
                {/* <Icon
                    name="chevron-left"
                    size={30}
                    color={'white'}
                    style={{}}
                    onPress={() => { navigation.pop() }}
                /> */}
                <Text style={styles.heading}>Complete your profile</Text>
            </View>
            <View style={styles.profileImageEdit}>
                <Icon
                    name="user-edit"
                    size={50}
                    color={'white'}
                    style={{}}
                />
            </View>
            <Text style={{ alignSelf: 'center', fontWeight: '700' }}>Upload Profile Image</Text>
            <View style={styles.uploadContainer}>
                <DocUploader
                    setDocument={setIdProofImage}
                    title="Upload ID Proof"
                />
            </View>
            <CategoriesAccordion services={data} onServicesSelect={handleServicesSelect} />
        </View>
    )
}

export default ProfileForm