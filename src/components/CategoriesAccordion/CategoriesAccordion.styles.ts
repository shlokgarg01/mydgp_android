import { StyleSheet } from "react-native";
import Colors from "../../helpers/Colors";

export const styles = StyleSheet.create({
    parentContainer: {
        height: '90%',
        padding: 10,
    },
    subCategoryCheckboxContainer: {
        marginLeft: 30,
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    submitButton: {
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        marginTop: 20,
        borderRadius: 5,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 10,
        right: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    }
})
