import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Platform} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {getUserDataApi, updateUserEmailApi, updateUserMessageApi, updateUserPhoneApi, updateUserPlateApi, updateUserProfileApi, updateUserTelegramLinkApi
} from '../../hooks/UserDataApi';
import {SuccessAlertComponent} from "../../components/SuccessAlertComponent";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import Settings from "../settings/Setting";
import * as ImagePicker from 'expo-image-picker';
import { UserPageStyles } from './UserStyle';
import LoginPage from "../login/LoginPage";


const UserPage = ({ userId, navigation, onLogout }) => {
    const [data, setData] = useState({});
    const [editing, setEditing] = useState(null);
    const [newEmail, setNewEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newCarPlate, setNewCarPlate] = useState('');
    const [newTelegram, setNewTelegram] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const styles = UserPageStyles;

    useEffect(() => {
        const fetchData = async () => {
            const response = await getUserDataApi(userId);
            setData(response);
        };

        fetchData();
    }, [userId]);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const selectProfilePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.cancelled) {
            updateProfilePhoto(result.uri);
        }
    };

    const updateProfilePhoto = async (uri) => {
        try {
            await updateUserProfileApi(userId, uri);
            setData({ ...data, photo: uri });
        } catch (error) {
            console.error('Error updating photo:', error.message);
        }
    };
    const callUpdateApi = async (header, newValue) => {

        switch (header) {
            case 'Email':
                return await updateUserEmailApi(userId, newValue);
            case 'Phone':
                return await updateUserPhoneApi(userId, newValue);
            case 'Car Plate':
                return await updateUserPlateApi(userId, newValue);
            case 'Telegram':
                return await updateUserTelegramLinkApi(userId, newValue);
            case 'Message':
                return await updateUserMessageApi(userId, newValue);
            default:
                return;
        }
    };

    const handleSave = async (header) => {
        const newValue = getInputValue(header);
        const response = await callUpdateApi(header, newValue);

        if (response.status === 200) {
            setData({ ...data, [header.toLowerCase()]: newValue });
            setEditing(null);
            SuccessAlertComponent(response.message);
        } else {
            console.error('Error updating data:', response.message);
        }
    };

    const getInputValue = (header) => {
        switch (header) {
            case 'Email':
                return newEmail;
            case 'Phone':
                return newPhone;
            case 'Car Plate':
                return newCarPlate;
            case 'Telegram':
                return newTelegram;
            case 'Message':
                return newMessage;
            default:
                return '';
        }
    };

    const setInputValue = (header, text) => {
        switch (header) {
            case 'Email':
                setNewEmail(text);
                break;
            case 'Phone':
                setNewPhone(text);
                break;
            case 'Car Plate':
                setNewCarPlate(text);
                break;
            case 'Telegram':
                setNewTelegram(text);
                break;
            case 'Message':
                setNewMessage(text);
                break;
            default:
                break;
        }
    };

    const renderRow = (iconName, label, header) => {
        const isEditing = editing === header;
        return (

            <View style={styles.row}>
                <Text style={styles.headerText}>{header}</Text>
                <View style={styles.rowContent}>
                    <Feather name={iconName} size={24} color="#333" />
                    <Text style={styles.label}>{label}</Text>
                    <TouchableOpacity
                        style={styles.editIcon}
                        onPress={() => (isEditing ? null : setEditing(header))}
                    >
                        <Feather name='edit' size={24} color="#007AFF" />
                    </TouchableOpacity>
                </View>
                {isEditing && (
                    <View style={styles.editArea}>
                        <TextInput
                            style={styles.input}
                            value={getInputValue(header)}
                            onChangeText={text => setInputValue(header, text)}
                        />
                        <TouchableOpacity style={styles.saveButton} onPress={() => handleSave(header)}>
                            <Text style={styles.saveButtonText}>Kaydet</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setEditing(null)}>
                            <Feather name="x" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={selectProfilePhoto}>
                    <Image style={styles.avatar} source={{ uri: data.photo }} />
                </TouchableOpacity>
                <Text style={styles.name}>{data.name}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Feather name="settings" size={24} color="#333" />
                </TouchableOpacity>
            </View>
            <View style={styles.info}>
                {renderRow('mail', data.mail, 'Email')}
                {data.phone && renderRow('phone', data.phone, 'Telefon')}
                {data.plate && renderRow('truck', data.plate, 'Araç Plakası')}
                {data.telegram && renderRow('send', data.telegram, 'Telegram')}
                {data.message && renderRow('message-square', data.message, 'Mesajım')}
            </View>
        </View>
    );
};
const Stack = createStackNavigator();

const UserPageStack = ({ userId, navigation, onLogout }) => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="UserPage">
                <Stack.Screen name="UserPage" options={{ headerShown: false }}>
                    {(props) => <UserPage {...props} userId={userId} navigation={props.navigation} />}
                </Stack.Screen>
                <Stack.Screen
                    name="Settings"
                    component={Settings}
                    options={{ title: 'Ayarlar' }}
                    initialParams={{ userId: userId, onLogout: onLogout }}
                />
                <Stack.Screen
                    name="LoginPage"
                    component={LoginPage}
                    options={{ title: 'Giriş Yap' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default UserPageStack;
