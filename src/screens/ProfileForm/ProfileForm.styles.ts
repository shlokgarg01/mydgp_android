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

    categoryContainer: {
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        overflow: 'hidden',
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
})