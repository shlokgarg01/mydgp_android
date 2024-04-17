import React, { useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
            <ScrollView style={styles.contentSection}>
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
                <Text style={styles.subHeading}>What do you have?</Text>
                <TextInput
                    style={styles.inputText}
                    placeholder={'Your camera brand'}
                />
                <TextInput
                    style={styles.inputText}
                    placeholder={'Shutter count'}
                />
                <TextInput
                    style={styles.inputText}
                    placeholder={'Body'}
                />
                <TextInput
                    style={styles.inputText}
                    placeholder={'Lens'}
                />
                <TextInput
                    style={styles.inputText}
                    placeholder={'Monopod'}
                />
                <TextInput
                    style={styles.inputText}
                    placeholder={'Tripod'}
                />
                <TextInput
                    style={styles.inputText}
                    placeholder={'Gimbal'}
                />
                <TextInput
                    style={styles.inputText}
                    placeholder={'Slider'}
                />
                <TextInput
                    style={styles.inputText}
                    placeholder={'Flash'}
                />
                <TextInput
                    style={styles.inputText}
                    placeholder={'Mic'}
                />
                <TextInput
                    style={styles.inputText}
                    placeholder={'RGB light'}
                />
                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.submitButton} >
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default ProfileForm