import { StyleSheet } from "react-native";
import Colors from "../../helpers/Colors";

export const styles = StyleSheet.create({
    parentContainer: {
        height: '100%',
        padding: 10,
    },
    contentSection:{
        height:'77%'
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
