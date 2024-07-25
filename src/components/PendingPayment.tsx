import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal';
import Colors from '../helpers/Colors';
import Btn from './Btn';

interface IPendingPayment {
    amount: number;
    onBtnPress: any;
}
const PendingPayment = (props: IPendingPayment) => {
    return (
        <Modal style={{ margin: 0 }} isVisible={true}>
            <View style={styles.parentView}>
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>
                        Pending Payment
                    </Text>
                </View>
                <Text style={styles.heading}>
                    Amount to be collected :  {props?.amount > -1 ? <Text style={styles.amount}>₹{Math.round(props?.amount)}</Text> : <ActivityIndicator size={22} style={{ paddingLeft: 10 }} />}
                </Text>
                <View style={styles.btnRow}>
                    <View style={styles.btnContainer}>
                        <Btn
                            label={'Payment Collected'}
                            color={Colors.THEME_COLOR}
                            onClick={props.onBtnPress}
                            disabled={undefined}
                            bgColor={undefined}
                        />
                    </View>
                    {/* <View style={styles.btnContainer}>
                        <Btn
                            label={'Send Payment Link'}
                            color={Colors.THEME_COLOR}
                            onClick={undefined}
                            disabled={undefined}
                            bgColor={undefined}
                        />
                    </View> */}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    parentView: {
        backgroundColor: 'white',
        height: 300,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        justifyContent: 'space-between'
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnContainer: {
        width: '95%',
        margin: 10
    },
    headingContainer: {
        backgroundColor: Colors.THEME_COLOR,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        padding: 25
    },
    heading: {
        fontSize: 20,
        textAlign: 'center',
    },
    amount: {
        color: Colors.DARK_GREEN,
        fontWeight: '600'
    },
})

export default PendingPayment