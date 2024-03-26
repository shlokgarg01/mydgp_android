import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './ProfileForm.styles';
import { useNavigation } from '@react-navigation/native';
import CategoriesAccordion from '../../components/CategoriesAccordion/CategoriesAccordion';

const ProfileForm = () => {
    const navigation: any = useNavigation();

    const data: any = [
        {
            id: 1,
            name: 'Photography',
            subServices: ['Street Photography', 'Nature/Landscape', 'Wedding photography'],
        },
        {
            id: 2,
            name: 'Videography',
            subServices: ['Underwater', 'Aerial', 'Vlog'],
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
                <Icon
                    name="chevron-left"
                    size={30}
                    color={'white'}
                    style={{}}
                    onPress={() => { navigation.pop() }}
                />
                <Text style={styles.heading}>Complete your profile</Text>
            </View>
            <CategoriesAccordion services={data} onServicesSelect={handleServicesSelect} />
        </View>
    )
}

export default ProfileForm