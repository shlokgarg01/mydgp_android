import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Modal from "react-native-modal";
import { styles } from './CompleteProfileModal.styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import RouteNames from '../../routes/RouteNames';

const CompleteProfileModal = () => {
    const navigation: any = useNavigation();
    return (
        <View>
            <Modal isVisible={true}>
                <View style={styles.modalContainer}>
                    <Icon
                        name="alert"
                        size={65}
                        color={'orange'}
                        style={styles.alertIcon}
                    />
                    <Text style={styles.alertText}>Oops ! Your profile is incomplete. Please complete your profile to get bookings !</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {

                            navigation.navigate(RouteNames.PROFILE_FORM);
                        }}
                    >
                        <Text style={styles.buttonText}>Complete Profile</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

export default CompleteProfileModal