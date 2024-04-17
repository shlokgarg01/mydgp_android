import { StyleSheet } from "react-native";
import Colors from "../../helpers/Colors";

export const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        height: '40%',
        width: '100%',
        borderRadius: 20,
        padding: 30
    },
    button: {
        backgroundColor: Colors.PRIMARY,
        position: 'absolute',
        height: '25%',
        bottom: 0,
        left: 0,
        right: 0,
        borderBottomEndRadius: 20,
        borderBottomLeftRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    alertText: {
        fontSize: 18,
        textAlign: 'center',
    },
    alertIcon: {
        alignSelf: 'center',
        marginBottom: '8%'
    }
})
