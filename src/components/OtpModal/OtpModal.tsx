import React, { useRef, useState } from 'react'
import { Text, View } from 'react-native'
import Modal from 'react-native-modal'
import { styles } from './OtpModal.styles'
import OTPTextInput from 'react-native-otp-textinput'
import Btn from '../Btn'
import Colors from '../../helpers/Colors'

interface IOtpModal {
    isOtpModalVisible: boolean;
    setOtp: (arg0: string) => void;
    setPhotoNumber: (arg0: string) => void;
    setOtpModalVisible: (arg0: boolean) => void
    submitAction: () => void
    isOtpVisible: boolean
}
const OtpModal = (props: IOtpModal) => {
    let otpInput: any = useRef(null);
    let photoNumberInput: any = useRef(null);

    return (
        <Modal isVisible={props.isOtpModalVisible}>
            <View style={styles.modalContainer}>
                <Text style={styles.close} onPress={() => props.setOtpModalVisible(false)} >x</Text>
                {props?.isOtpVisible && <>
                    <Text style={styles.heading}>Enter OTP</Text>
                    <OTPTextInput
                        tintColor={Colors.THEME_COLOR}
                        ref={e => (otpInput = e)}
                        handleTextChange={(value) => props.setOtp(value)}
                    />
                    <Text style={styles.askOtpText}>Please ask OTP from customer</Text>
                </>
                }
                <Text style={styles.heading}>Enter Last 4 Digits (Photo/Video) No.</Text>
                <OTPTextInput
                    tintColor={Colors.THEME_COLOR}
                    ref={e => (photoNumberInput = e)}
                    handleTextChange={(value) => props?.setPhotoNumber(value)}
                />
                <View style={styles.buttonContainer}>
                    <Btn
                        label={'Submit'}
                        onClick={() => {
                            props.submitAction();
                            props.setOtpModalVisible(false)
                        }}
                        disabled={undefined}
                        bgColor={Colors.THEME_COLOR}
                        color={undefined}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default OtpModal