import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center'
    },
    heading: {
        fontSize: 16,
        fontWeight: '600',
    },
    askOtpText: {
        marginTop: 10,
        marginBottom: 60,
        fontSize: 14,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 30
    },
    close: {
        fontSize: 22,
        width: '100%',
        fontWeight: '300',
        textAlign: 'right',
        marginTop: -20,
        marginEnd: -20,
        marginBottom: 20
    }
})