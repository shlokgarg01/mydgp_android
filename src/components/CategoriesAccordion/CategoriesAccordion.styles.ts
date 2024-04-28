import { StyleSheet } from "react-native";
import Colors from "../../helpers/Colors";

export const AccordianStyles = StyleSheet.create({
    subCategoryCheckboxContainer: {
        marginLeft: 30,
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    categoryContainer: {
        backgroundColor: 'white',
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
    submitButton: {
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        marginTop: 20,
        borderRadius: 5,
        alignItems: 'center',
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
