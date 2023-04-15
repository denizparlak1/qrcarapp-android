import React, {useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    View,
    Text,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {signInWithEmailAndPassword} from "../../auth/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LoginPage = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const {user} = await signInWithEmailAndPassword(email, password);
            await AsyncStorage.setItem('userId', user.uid);
            onLogin(user.uid);
        } catch (error) {
            Alert.alert('Hatalı kullanıcı veya parola eşleşmesi!', error.message);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/logo.png')}
                />
                <Text style={styles.label}>Email</Text>
                <View style={styles.iconInputContainer}>
                    <Icon name="email" size={20} color="gray" />
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Şifre</Text>
                <View style={styles.iconInputContainer}>
                    <Icon name="lock" size={20} color="gray" />
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry
                    />
                </View>
            </View>
            <Button title="Giriş Yap" onPress={handleLogin} />

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 8,
    },
    iconInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        paddingHorizontal: 8,
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 8,
    },
    logo: {
        width: 290,
        height: 125,
        alignSelf: 'center',
        marginBottom: 20,
    }
});

export default LoginPage;
