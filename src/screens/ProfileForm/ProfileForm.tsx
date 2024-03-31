import React from 'react'
import { Text, View } from 'react-native'
import { styles } from './ProfileForm.styles';
import { useNavigation } from '@react-navigation/native';
import CategoriesAccordion from '../../components/CategoriesAccordion/CategoriesAccordion';

const ProfileForm = () => {
    const navigation: any = useNavigation();

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
            <CategoriesAccordion services={data} onServicesSelect={handleServicesSelect} />
        </View>
    )
}

export default ProfileForm