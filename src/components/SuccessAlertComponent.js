import {Alert} from "react-native";

export const SuccessAlertComponent = (message) => {
    Alert.alert(
        'Başarılı',
        message,
        [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
    );
};
