import { StyleSheet } from 'react-native';

export const UserPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 40,
        justifyContent: "center"
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
        justifyContent: 'center'
    },
    name: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#333",
    },
    info: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        paddingVertical: 40,
        paddingHorizontal: 30,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    row: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    rowContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        marginLeft: 20,
        fontSize: 18,
        color: "#333",
    },
    editIcon: {
        marginLeft: "auto",
    },
    editArea: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: "#f9f9f9",
        color: "#333",
        fontSize: 18,
        marginRight: 10,
    },
    saveButton: {
        backgroundColor: "#1E90FF",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginRight: 10,
        alignSelf: 'flex-start',
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    cancelButton: {
        backgroundColor: "#dc3545",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    cancelButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
});
