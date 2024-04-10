import { StyleSheet } from "react-native";
import Colors from "../../helpers/Colors";

export const styles = StyleSheet.create({
    topBar: {
        backgroundColor: Colors.PRIMARY,
        padding: 8,
        paddingVertical: 18,
        flexDirection: 'row',
        alignItems: 'center'
    },
    heading: {
        fontSize: 18,
        color: Colors.WHITE,
        marginStart: 20
    },
    contentSection: {
        paddingHorizontal: 10,
    },
    subHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 25,
    },
    inputText: {
        backgroundColor: 'white',
        margin: 5,
        paddingHorizontal: 15,
        borderBottomWidth: 0.5
    },
    profileImageEdit: {
        backgroundColor: Colors.LIGHT_PRIMARY,
        width: 100,
        height: 100,
        alignItems: 'center',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 100,
        marginTop: 20
    },
    categoryContainer: {
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        overflow: 'hidden',
    },
    uploadContainer: {
        padding: 20,
    },
    categoryHeader: {
        padding: 10,
        backgroundColor: '#e0e0e0',
    },
    categoryHeaderText: {
        fontWeight: 'bold',
    },
    subcategoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    subcategoryText: {
        marginLeft: 10,
    },
    submitButton: {
        backgroundColor: Colors.PRIMARY,
        padding: 15,
        marginTop: 20,
        marginBottom: 100,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16
    },
})