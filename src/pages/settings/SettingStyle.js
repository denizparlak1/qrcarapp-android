import { StyleSheet } from 'react-native';

export const SettingPageStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 20,
    },
    section: {
        marginBottom: 40,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 12,
        marginBottom: 20,
    },

    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 4,
        marginBottom: 20,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    qrCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    downloadButton: {
        backgroundColor: 'rgba(45,72,45,0.6)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        marginLeft: 10,
    },
    downloadButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    switchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 8,
    },
});