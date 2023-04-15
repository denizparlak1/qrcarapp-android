import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, Image, Alert} from 'react-native';
import {
    getUserDataApi, updateUserPasswordApi,
    updateUserPhonePermissionApi,
    updateUserTelegramPermissionApi,
    updateUserWhatsappPermissionApi
} from '../../hooks/UserDataApi';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SuccessAlertComponent} from "../../components/SuccessAlertComponent";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import {useNavigation} from '@react-navigation/native';
import { SettingPageStyle } from './SettingStyle'
import {auth} from "../../config/firebase";
import LoginPage from "../login/LoginPage";
const Settings = ({ route }) => {
    const { userId } = route.params;
    const [data, setData] = useState({});
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [telegramPermission, setTelegramPermission] = useState(false);
    const [whatsappPermission, setWhatsappPermission] = useState(false);
    const [phonePermission, setPhonePermission] = useState(false);

    const styles = SettingPageStyle;
    const navigation = useNavigation()

    useEffect(() => {
        const fetchData = async () => {
            const response = await getUserDataApi(userId);
            setData(response);

            setTelegramPermission(response.telegram_permission);
            setWhatsappPermission(response.whatsapp_permission);
            setPhonePermission(response.phone_permission);
        };

        fetchData();
    }, [userId]);


    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigation.navigate('LoginPage');
        } catch (error) {
            console.error(error);
        }
    };


    const isValidPassword = () => {
        return newPassword !== '';
    };

    const handlePasswordUpdate = async () => {
        if (!isValidPassword()) {
            Alert.alert('Hata', 'Lütfen yeni oluşturmak istediğiniz şifreyi yazın');
            return;
        }
        try {
            const response = await updateUserPasswordApi(userId, newPassword);
            if (response.status === 200) {
                SuccessAlertComponent(response.message);
                setNewPassword('')
            } else {
                console.error("Failed to update Password");
            }
        } catch (error) {
            console.error("Error updating Password:", error);
        }
    };

    const downloadQRCode = async () => {
        try {
            const imageUrl = data.qr; // Use the QR code URL from your data
            const fileName = 'qrcode.svg';
            const downloadPath = `${FileSystem.cacheDirectory}${fileName}`;

            const response = await FileSystem.downloadAsync(
                imageUrl,
                downloadPath
            );

            if (response && response.uri) {
                // Request permission to access the media library
                const { status } = await MediaLibrary.requestPermissionsAsync();

                if (status === 'granted') {
                    // Save the downloaded file to the media library
                    await MediaLibrary.createAssetAsync(response.uri);
                    Alert.alert('Success', 'QR code downloaded successfully');
                } else {
                    Alert.alert('Error', 'Permission to access media library denied');
                }
            } else {
                throw new Error('Error downloading QR code');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to download QR code');
        }
    };
        const updateTelegramPermission = async (newValue) => {
        try {
            const response = await updateUserTelegramPermissionApi(userId, newValue);
            if (response.status === 200) {
                SuccessAlertComponent(response.message);
            } else {
                console.error("Failed to update Telegram permission");
            }
        } catch (error) {
            console.error("Error updating Telegram permission:", error);
        }
    };


    const updateWhatsappPermission = async (newValue) => {
        try {
            const response = await updateUserWhatsappPermissionApi(userId, newValue);
            if (response.status === 200) {
                SuccessAlertComponent(response.message);
            } else {
                console.error("Failed to update Telegram permission");
            }
        } catch (error) {
            console.error("Error updating Telegram permission:", error);
        }
    };

    const updatePhonePermission = async (newValue) => {
        try {
            const response = await updateUserPhonePermissionApi(userId, newValue);
            if (response.status === 200) {
                SuccessAlertComponent(response.message);
            } else {
                console.error("Failed to update Telegram permission");
            }
        } catch (error) {
            console.error("Error updating Telegram permission:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Şifre değiştir</Text>
                <TextInput
                    style={styles.input}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    placeholder="Yeni şifrenizi yazın"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handlePasswordUpdate}
                >
                    <Text style={styles.buttonText}>Güncelle</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>İletişim İzinleri</Text>
                <View style={styles.switchRow}>
                    <Text style={styles.switchLabel}>Telegram</Text>
                    <Switch
                        value={telegramPermission}
                        onValueChange={(newValue) => {
                            setTelegramPermission(newValue);
                            updateTelegramPermission(newValue);
                        }}
                    />
                </View>
                <View style={styles.switchRow}>
                    <Text style={styles.switchLabel}>WhatsApp</Text>
                    <Switch
                        value={whatsappPermission}
                        onValueChange={(newValue) => {
                            setWhatsappPermission(newValue);
                            updateWhatsappPermission(newValue);
                        }}
                    />
                </View>
                <View style={styles.switchRow}>
                    <Text style={styles.switchLabel}>Phone</Text>
                    <Switch
                        value={phonePermission}
                        onValueChange={(newValue) => {
                            setPhonePermission(newValue);
                            updatePhonePermission(newValue);
                        }}
                    />
                </View>
            </View>
            <View style={styles.qrCodeContainer}>
                <Icon name="qrcode" size={30} color="#000" />
                <TouchableOpacity
                    style={styles.downloadButton}
                    onPress={downloadQRCode}
                >
                    <Text style={styles.downloadButtonText}>QR Kodu İndir</Text>
                </TouchableOpacity>
            </View>
            <View>
                {/* your settings page content */}
                <TouchableOpacity onPress={handleLogout}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Settings;
