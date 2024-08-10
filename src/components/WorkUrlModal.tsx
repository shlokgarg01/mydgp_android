import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../helpers/Colors';
import Btn from './Btn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../Axios';

interface IWorkUrlModal {
    isWorkUrlModalVisible: boolean;
    setWorkUrlModalVisible: (arg0: boolean) => void;
    selectedBooking: any;
}

const WorkUrlModal = (props: IWorkUrlModal) => {
    const [workUrl, setWorkUrl] = React.useState('');

    // Submit Drive link api
    const callCreateDeliveryRequest = async (
        id: string,
        deliveryUrl: string,
        contactNumber: string,
    ) => {
        const url = `${BASE_URL}/api/v1/deliveryRequests/create`;
        let token = await AsyncStorage.getItem('token');
        token = token ? JSON.parse(token) : '';
        const headers = {
            Accept: 'application/json, text/plain, */*',
            Connection: 'keep-alive',
            'Content-Type': 'application/json',
            authorization: `${token}`,
        };

        // Define the body of the request
        const body = JSON.stringify({
            _id: id,
            deliveryUrl: deliveryUrl,
            contactNumber: contactNumber,
            isApproved: false,
        });

        try {
            // Make the API request
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: body,
            });

            // Check if the response is OK
            if (response.ok) {
                const data = await response.json();
            } else {
                const errorData = await response.json();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Modal isVisible={props?.isWorkUrlModalVisible}>
            <View style={styles.modalContainer}>
                <Text
                    style={styles.close}
                    onPress={() => props.setWorkUrlModalVisible(false)}>
                    x
                </Text>

                <TextInput
                    placeholderTextColor={Colors.GRAY}
                    style={styles.inputText}
                    onChangeText={value => {
                        setWorkUrl(value);
                    }}
                    placeholder={'Photo/Video Drive Link'}
                />
                <View style={styles.buttonContainer}>
                    <Btn
                        label={'Submit'}
                        onClick={() => {
                            callCreateDeliveryRequest(
                                props?.selectedBooking?._id,
                                workUrl,
                                props?.selectedBooking?.customer?.contactNumber,
                            );
                            props.setWorkUrlModalVisible(false);
                        }}
                        disabled={undefined}
                        bgColor={Colors.THEME_COLOR}
                        color={undefined}
                        style={undefined}
                    />
                </View>
            </View>
        </Modal>
    );
};

export const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20,
        padding: 50,
        alignItems: 'center',
    },
    inputText: {
        color: 'black',
        backgroundColor: 'white',
        margin: 5,
        paddingHorizontal: 15,
        borderBottomWidth: 0.5,
        width: '100%',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 30,
    },
    close: {
        fontSize: 22,
        width: '100%',
        fontWeight: '300',
        textAlign: 'right',
        marginTop: -40,
        marginEnd: -40,
        marginBottom: 20,
    },
});

export default WorkUrlModal;
